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

  import DataDisplay from './DataDisplay.svelte'
  import DateRange from './DateRange.svelte'
  import SideBar from './SideBar.svelte'

  import type { filterItem } from '../../../../interface'

  export let sourceID: number
  let loading = false
  let dataReady = false
  let aggregation: any = {}
  
  export let selectedMenuItem:string
  export let filter:filterItem[] = []
  export let activeVisualizationTabIndex: number

  let loadAggregation = async () => {
    loading = true
    let status
    if (dateRangeAvailable) {
      [status, aggregation] = await api.getAggregation(
        sourceID,
        '*',
        filter,
        startDate, startTime, endDate, endTime
      )
      dataReady = status
    } else {
      [status, aggregation] = await api.getDatelessAggregation(
        sourceID,
        '*',
        filter,
      )
      dataReady = status
    }
    loading = false
  }
  
  export let dateRangeAvailable: boolean
  export let startDate: any
  export let startTime: any
  export let endDate: any
  export let endTime: any
  
  let dateRangeSelectHandler = () => {
    loadAggregation()
  }

  let selectHandler: any
  
  onMount(async () => {
    await loadAggregation()    
  })
</script>

<section class="section px-0 pt-0">
  <div class="container">
    <div class="columns">
      <div class="column is-one-fifth">
        <SideBar bind:selected={selectedMenuItem} availableLabels={Object.keys(aggregation).filter(key => aggregation[key].length > 0)} />
        <DateRange
          bind:dateRangeAvailable={dateRangeAvailable}
          bind:startDate={startDate}
          bind:startTime={startTime}
          bind:endDate={endDate}
          bind:endTime={endTime}
          dateRangeSelectCallback={dateRangeSelectHandler}
          />
      </div>
      <div class="column is-four-fifths">
        <div class="box">
          {#if dataReady} 
            <DataDisplay
              data={aggregation[selectedMenuItem]}
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
            />
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
