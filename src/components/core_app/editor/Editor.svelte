<script lang='typescript'>
  import { Route } from 'svelte-navigator'
  import NavBar from './nav_bar/NavBar.svelte'
  import AddDataPage from './add_data_page/AddDataPage.svelte'
  import Explore from './explore/Explore.svelte'
  import type { filterItem, text, insight, countItem } from '../../../interface'
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'
  import relativeTime from 'dayjs/plugin/relativeTime'
  dayjs.extend(customParseFormat)
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(relativeTime)

  const dateParseFormat = 'YYYY-MM-DDTHH:mmZ'

  import Insights from '../insights/Insights.svelte'

  import { useNavigate } from 'svelte-navigator'
  const navigate = useNavigate()

  export let sourceID:number

  let selectedMenuItem:string = ''
  let filter:filterItem[] = []
  let activeVisualizationTabIndex: number = 0
  let tabs: {handle: string, icon: string}[]
  let dateRangeAvailable = false
  let startDate = dayjs('1900-01-01 00:00').format('YYYY-MM-DD')
  let startTime = dayjs('1900-01-01 00:00').format('HH:mm')
  let endDate = dayjs().format('YYYY-MM-DD')
  let endTime = dayjs().format('HH:mm')
  let searchText = ''
  let texts: text[] = []
  let aggregation: any = {}
  let availableLabels = []
  let loadData: any
  let insight: insight = {
    title: 'Untitled insight',
    id: 0,
    filter: [],
    visualizeTexts: [],
    lookForHandle: '',
    lastUpdated: '',
    dateRangeAvailable: false,
    startDate: '',
    endDate: '',
    visualizationType: 'barchart'
  }

  const loadInsight = async (insightToBeLoaded: insight) => {
    filter = insightToBeLoaded.filter
    selectedMenuItem = insightToBeLoaded.lookForHandle
    insight = {...insightToBeLoaded}
    dateRangeAvailable = insightToBeLoaded.dateRangeAvailable
    startDate = dayjs(insightToBeLoaded.startDate, dateParseFormat).format('YYYY-MM-DD')
    startTime = dayjs(insightToBeLoaded.startDate, dateParseFormat).format('HH:mm')
    endDate = dayjs(insightToBeLoaded.endDate, dateParseFormat).format('YYYY-MM-DD')
    endTime = dayjs(insightToBeLoaded.endDate, dateParseFormat).format('HH:mm')
    let tabIndex: any
    for(tabIndex in tabs) {
      if (tabs[tabIndex].handle === insightToBeLoaded.visualizationType) {
        activeVisualizationTabIndex = tabIndex
      }
    }
    navigate(`../${sourceID}/explore`)
  }
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
        bind:availableLabels={availableLabels}
        bind:loadData={loadData}
        bind:insight={insight}
        bind:tabs={tabs}
      />
    </section>
  </Route>
  <Route path='/add'>
    <NavBar selectedMenuItem='add' />
    <AddDataPage sourceID={sourceID} />
  </Route>
  <Route path='/insights'>
    <NavBar selectedMenuItem='insights' />
    <Insights sourceID={sourceID} loadInsight={loadInsight} />
  </Route>
</div>