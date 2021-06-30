<script lang='typescript'>
  import { onMount } from 'svelte'
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

  import type { filterItem, source, text } from '../../../../interface'
  import { fetchSources, getSource } from '../../../../models/source'
import SaveInsightModal from './SaveInsightModal.svelte'
import { notify } from '../../../../models/notifications';

  export let sourceID: number
  let loading = false
  let reloading = false
  let dataReady = false
  export let aggregation: any
  let totalAnalyzedTexts = 0
  let totalCountQualification: string
  let availableLabels = []
  
  export let selectedMenuItem:string
  export let filter:filterItem[] = []
  export let activeVisualizationTabIndex: number

  let loadAggregation = async () => {
    loading = true
    let status
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
    Object.keys(aggregation).forEach(label => {
      for(let i =0; i < 10 && i < aggregation[label].length; i++)
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

  const loadData = async () => {
    await loadAggregation()    
    let status: boolean
    [status, totalAnalyzedTexts, totalCountQualification, texts] = await api.getAnalyzedText(sourceID, '', 0, false, '', '', '', '', [])
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

  const saveInsightHandler = () => {
    notify("Insight saved", "success is-light")
  }
  
  onMount(loadData)
  
  export let texts:text[] = []
  let currentTextPage = 0
  let source: source
  
  let dateRangeSelectHandler = () => {
    loadAggregation()
    loadAnalyzedText()
  }

  const loadAnalyzedText = async (append=false) => {
    source = getSource(sourceID)
    if (!source) {
      await fetchSources()
      source = getSource(sourceID)
    }

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
</script>

<section class="section px-0 pt-0">
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
  />
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