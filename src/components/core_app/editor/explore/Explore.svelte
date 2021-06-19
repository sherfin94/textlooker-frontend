<script lang='typescript'>
  import { onMount } from 'svelte'
  import api from '../../../../api'
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
    [status, aggregation] = await api.getDatelessAggregation(
      sourceID,
      '*',
      Array.from(filter.authors),
      Array.from(filter.people),
      Array.from(filter.gpe),
      Array.from(filter.tokens)
    )
    dataReady = status
    loading = false
  }
  
  onMount(async () => {
    await loadAggregation()    
  })

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

</script>

<section class="section px-0 pt-0">
  <div class="container">
    <div class="columns">
      <div class="column is-one-fifth">
        <SideBar bind:selected={selectedMenuItem} />
        <DateRange />
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
