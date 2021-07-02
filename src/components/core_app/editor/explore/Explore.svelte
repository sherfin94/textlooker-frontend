<script lang='typescript'>
  import { onMount } from 'svelte'
  import { Link } from 'svelte-navigator'
  import api from '../../../../api'
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'
  dayjs.extend(customParseFormat)
  dayjs.extend(utc)
  dayjs.extend(timezone)

  import DataDisplay from './data_display/DataDisplay.svelte'
  import DateRange from './DateRange.svelte'
  import SideBar from './SideBar.svelte'

  import type { countItem, filterItem, insight, source, text } from '../../../../interface'
  import { getSource } from '../../../../models/source'
  import SaveInsightModal from './SaveInsightModal.svelte'
  import { notify } from '../../../../models/notifications'
  import menu from './menu'

  export let sourceID: number
  let loading = false
  let reloading = false
  let dataReady = false
  export let aggregation: countItem[]
  let totalAnalyzedTexts = 0
  let totalCountQualification: string
  export let availableLabels: string[]
  
  export let selectedMenuItem:string
  export let filter:filterItem[] = []
  export let activeVisualizationTabIndex: number

  let loadAggregation = async () => {
    loading = true
    let status: boolean
    if (dateRangeAvailable) {
      [status, aggregation] = await api.getAggregation(
        sourceID,
        '',
        filter,
        startDate, startTime, endDate, endTime
      )
      dataReady = status
    } else {
      [status, aggregation] = await api.getDatelessAggregation(
        sourceID,
        '',
        filter,
      )
      dataReady = status
    }
    availableLabels = Object.keys(aggregation).filter(key => aggregation[key].length > 0)
    if (selectedMenuItem == '') {
      if (!availableLabels.includes(selectedMenuItem)) {
      for(let menuIndex in menu) {
        const handle = menu[menuIndex].handle
        if(availableLabels.includes(handle)) {
          selectedMenuItem = handle
          break
        }
      }
    }
    }


    Object.keys(aggregation).forEach(label => {
      for(let i =0; i < 10 && i < aggregation[label].length; i++)
      if (insight.visualizeTexts.includes(aggregation[label][i].key) || insight.visualizeTexts.length === 0)
      aggregation[label][i]['show'] = true
    })
    loading = false
  }
  
  export let dateRangeAvailable: boolean
  export let startDate: any
  export let startTime: any
  export let endDate: any
  export let endTime: any
  export let searchText: string
  export let insight: insight

  export const loadData = async () => {
    await loadAggregation()    
    await loadAnalyzedText()
  }

  const reload = async () => {
    reloading = true
    await loadData()
    reloading = false
    notify("Data reloaded", "info is-light")
  }

  let saveInsightModalOn = false

  const closeSaveInsightModal = () => {
    saveInsightModalOn = false
  }

  const saveInsightHandler = (title: string) => {
    notify("Insight saved", "success is-light")
    insight = Object.assign({}, insight, { title })
  }
  
  onMount(async() => {
    await loadData()
  })
  
  export let texts:text[] = []
  let currentTextPage = 0
  let source: source
  
  let dateRangeSelectHandler = async () => {
    insight = Object.assign({}, insight, { visualizeTexts : []})
    await loadAggregation()
    loadAnalyzedText()
  }

  const loadAnalyzedText = async (append=false) => {
    source = await getSource(sourceID)

    if (!append) currentTextPage = 0
    
    let status: boolean
    let newTexts = []
    if (dateRangeAvailable) {
      [status, totalAnalyzedTexts, totalCountQualification, newTexts] = await api.getAnalyzedText(sourceID, searchText, (currentTextPage)*20, true,  startDate, startTime, endDate, endTime, filter)
    } else {
      [status, totalAnalyzedTexts, totalCountQualification, newTexts] = await api.getAnalyzedText(sourceID, searchText, (currentTextPage)*20, false, '', '', '', '', filter)
    }
    if (append) {
      texts = [...texts, ...newTexts]
      currentTextPage += 1
    } else  texts = newTexts
  }

  let displayBarChart = () => {
    activeVisualizationTabIndex = 0
  }

  export let tabs: any[]
</script>

<section class="section px-0 pt-0">
  {#if (!loading || reloading)}
    {#if aggregation[selectedMenuItem] && aggregation[selectedMenuItem].length !== 0}
      <div class="container">
        <div class="columns">
          <div class="column is-one-fifth">
            <SideBar bind:selected={selectedMenuItem} bind:availableLabels={availableLabels} displayBarChart={displayBarChart}/>
            <DateRange
            bind:dateRangeAvailable={dateRangeAvailable}
            bind:startDate={startDate}
            bind:startTime={startTime}
            bind:endDate={endDate}
            bind:endTime={endTime}
            dateRangeSelectCallback={dateRangeSelectHandler}
            />
            <div class="box is-link">
              <div class="buttons reloadButtonContainer">
                <button class="button is-link m-0 mb-2 {reloading ? 'is-loading' : ''}" on:click={reload}>Reload data</button>
                <button class="button is-success m-0" on:click={() => saveInsightModalOn = true}>Save insight</button>
              </div>
            </div>
          </div>
          <div class="column is-four-fifths">
            <div class="box">
              {#if dataReady} 
                <DataDisplay
                  bind:data={aggregation[selectedMenuItem]}
                  label={selectedMenuItem}
                  sourceID={sourceID}
                  bind:filter={filter}
                  bind:activeTabIndex={activeVisualizationTabIndex}
                  loadAggregation={loadAggregation}
                  dateRangeAvailable={dateRangeAvailable}
                  startDate={startDate}
                  startTime={startTime}
                  endDate={endDate}
                  endTime={endTime}
                  loadAnalyzedText={loadAnalyzedText}
                  analyzedTextCount={totalAnalyzedTexts}
                  totalCountQualification={totalCountQualification}
                  bind:texts={texts}
                  bind:currentTextPage={currentTextPage}
                  bind:searchText={searchText}
                  bind:insight={insight}
                  bind:tabs={tabs}
                  reload={reload}
                />
              {/if}
            </div>
          </div>
        </div>
      </div>
      <SaveInsightModal
        on={saveInsightModalOn}
        close={closeSaveInsightModal}
        insightCreatedHandler={saveInsightHandler}
        filter={filter}
        sourceID={sourceID}
        visualizeTexts={aggregation[selectedMenuItem] && aggregation[selectedMenuItem].filter(item => item.show).map(item => item.key)}
        lookForHandle={selectedMenuItem}
        dateRangeAvailable={dateRangeAvailable}
        startDate={startDate}
        startTime={startTime}
        endDate={endDate}
        endTime={endTime}
        visualizationType={tabs && tabs[activeVisualizationTabIndex].handle}
      />
    {:else}
      <p class="p-3">
        This source does not contain any analyzed data. If you just uploaded data, please wait. Otherwise please go to <Link to='../add'>Add data</Link>
        to add data. If you feel something is wrong, please contact support.
      </p>
    {/if}
  {:else}
      <progress class="progress is-primary"></progress>
  {/if}
</section>


<style type='scss'>
  div.reloadButtonContainer {
    align-content: center;
    flex-direction: column;

    button {
      border-radius: 3px;
    }
  }
</style>