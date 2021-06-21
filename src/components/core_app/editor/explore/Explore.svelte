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

  import AggregationChart from './AggregationChart.svelte'
  import Filter from './Filter.svelte'
  import DateRange from './DateRange.svelte'

  import SideBar from './SideBar.svelte'
  export let sourceID: number
  let selectedMenuItem:string
  let loading = false
  let dataReady = false
  let aggregation: any

  let filter = {
    people: new Set<string>(),
    gpe: new Set<string>(),
    authors: new Set<string>(),
    tokens: new Set<string>()
  }

  let filterCount = 0
  let countFilters = () => {
    return Object.keys(filter).map(key => [...filter[key]]).flat().length
  }

  let loadAggregation = async () => {
    loading = true
    let status
    if (dateRangeAvailable) {
      [status, aggregation] = await api.getAggregation(
        sourceID,
        '*',
        Array.from(filter.authors),
        Array.from(filter.people),
        Array.from(filter.gpe),
        Array.from(filter.tokens),
        startDate, startTime, endDate, endTime
      )
      dataReady = status
    } else {
      [status, aggregation] = await api.getDatelessAggregation(
        sourceID,
        '*',
        Array.from(filter.authors),
        Array.from(filter.people),
        Array.from(filter.gpe),
        Array.from(filter.tokens)
      )
      dataReady = status
    }
    loading = false
  }
  
  
  let selectHandler = async (selectedItem: string) => {
    filter[selectedMenuItem].add(selectedItem)
    filter = {...filter}
    filterCount = countFilters()
    await loadAggregation()
  }
  
  let deselect = async (item: string, filterKey: string) => {
    filter[filterKey].delete(item)
    filter = {...filter}
    filterCount = countFilters()
    await loadAggregation()
  }
  
  let dateRangeAvailable = false
  let startDate = dayjs('1900-01-01 00:00').format('YYYY-MM-DD')
  let startTime = dayjs('1900-01-01 00:00').format('HH:mm')
  let endDate = dayjs().format('YYYY-MM-DD')
  let endTime = dayjs().format('HH:mm')
  
  let dateRangeSelectHandler = () => {
    loadAggregation()
  }
  
  onMount(async () => {
    await loadAggregation()    
  })
</script>

<section class="section px-0 pt-0">
  <div class="container">
    <div class="columns">
      <div class="column is-one-fifth">
        <SideBar bind:selected={selectedMenuItem} />
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
            {#if filterCount > 0}
              <Filter filter={filter} deselect={deselect} />
            {/if}                
            <AggregationChart data={aggregation[selectedMenuItem]} label={selectedMenuItem} selectedHandler={selectHandler} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>
