<script lang='typescript'>
  import { Route } from 'svelte-navigator'
  import NavBar from './nav_bar/NavBar.svelte'
  import AddDataPage from './add_data_page/AddDataPage.svelte'
  import Explore from './explore/Explore.svelte'
  import type { filterItem, text } from '../../../interface'
  import dayjs from 'dayjs'

  export let sourceID:number

  let selectedMenuItem:string
  let filter:filterItem[] = []
  let activeVisualizationTabIndex: number = 0
  let dateRangeAvailable = false
  let startDate = dayjs('1900-01-01 00:00').format('YYYY-MM-DD')
  let startTime = dayjs('1900-01-01 00:00').format('HH:mm')
  let endDate = dayjs().format('YYYY-MM-DD')
  let endTime = dayjs().format('HH:mm')
  let searchText = ''
  let texts: text[] = []
  let aggregation: any = {}
</script>

<div>
  <Route path='/explore'>
    <NavBar selectedMenuItem='explore' />
    <section class="section px-0 pt-3">
      <Explore
        sourceID={sourceID}
        bind:selectedMenuItem={selectedMenuItem}
        bind:filter={filter}
        bind:activeVisualizationTabIndex={activeVisualizationTabIndex} 
        bind:dateRangeAvailable={dateRangeAvailable}
        bind:startDate={startDate}
        bind:startTime={startTime}
        bind:endDate={endDate}
        bind:endTime={endTime}
        bind:searchText={searchText}
        bind:texts={texts}
        bind:aggregation={aggregation}
      />
    </section>
  </Route>
  <Route path='/add'>
    <NavBar selectedMenuItem='add' />
    <AddDataPage sourceID={sourceID} />
  </Route>
</div>