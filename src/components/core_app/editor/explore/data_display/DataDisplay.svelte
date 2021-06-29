<script lang='typescript'>
  import type { countItem, filterItem, source, text} from '../../../../../interface'

  import AggregationChart from './AggregationChart.svelte'
  import PieChart from './PieChart.svelte'
  import TextDisplay from './text_display/TextDisplay.svelte'
  import FlowChart from './FlowChart.svelte'
  import Filter from './Filter.svelte'
  import SpecificationBox from './SpecificationBox.svelte'

  export let data: countItem[]
  export let label: string
  export let loadAggregation: () => void
  export let sourceID: number
  export let filter: filterItem[]

  export let dateRangeAvailable: boolean
  export let startDate: string
  export let startTime: string
  export let endDate: string
  export let endTime: string

  let tabs = [
    { handle: 'barchart', icon: 'bar_chart' },
    { handle: 'piechart', icon: 'pie_chart' },
    { handle: 'flowchart', icon: 'area_chart' },
    { handle: 'text', icon: 'text_snippet' },
  ]
  export let activeTabIndex = 0

  let tabSelect = (index:number) => {
    activeTabIndex = index
  }

  let scrollFilterRight: (value: number) => void

  let filterCount = 0
  let countFilters = () => {
    return filter.length
  }

  export let selectHandler = async (selectedItem: string) => {
    if (filter.filter(item => item.text === selectedItem && item.label === label).length === 0) {
      filter = [...filter, {label: label, text: selectedItem}]
    }
    console.log("Filter: ", filter)
    filterCount = countFilters()
    setTimeout(() => {
      scrollFilterRight && scrollFilterRight(10000)
    }, 10)
    await loadAggregation()
    await loadAnalyzedText()
  }

  let deselect = async (index: number) => {
    filter = [...filter.slice(0, index), ...filter.slice(index+1)]
    filterCount = countFilters()
    await loadAggregation()
    await loadAnalyzedText()
  }

  export let loadAnalyzedText: any
  export let currentTextPage: any
  export let texts: text[]
  export let searchText: string
  export let analyzedTextCount: number
  export let totalCountQualification: string
</script>

<div class="container">
  <div class="columns">
    <div class="column tabs-column is-one-fifths">
      <div class="tabs">
        <ul>
          {#each tabs as tab, index}
            <li class={activeTabIndex === index ? 'is-active' : ''}>
              <!-- svelte-ignore a11y-missing-attribute -->
              <a on:click={() => tabSelect(index)}>
                <span class="material-icons-outlined">
                  {tab.icon}
                </span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <div class="column is-four-fifths">
      {#if filter.length > 0}
        <!-- <Filter filter={filter} deselect={deselect} bind:scrollRight={scrollFilterRight}/> -->
      {/if}
    </div>
  </div>
  {#if tabs[activeTabIndex].handle === 'barchart' }
    <AggregationChart data={data && data.filter(item => item.show)} selectedHandler={selectHandler} />
    <SpecificationBox
      analyzedTextCount={analyzedTextCount}
      totalCountQualification={totalCountQualification}
      bind:data={data}
      bind:filter={filter}
      deselect={deselect}
      scrollFilterRight={scrollFilterRight}
    />
  {:else if tabs[activeTabIndex].handle === 'piechart'}
    <PieChart data={data && data.filter(item => item.show)} selectedHandler={selectHandler} />
      <SpecificationBox
      analyzedTextCount={analyzedTextCount}
      totalCountQualification={totalCountQualification}
      bind:data={data}
      bind:filter={filter}
      deselect={deselect}
      scrollFilterRight={scrollFilterRight}
    />
  {:else if tabs[activeTabIndex].handle === 'flowchart'}
    <FlowChart
      data={data}
      selectedHandler={selectHandler}
      sourceID={sourceID}
      filter={filter}
      dateRangeAvailable={dateRangeAvailable}
      startDate={startDate}
      startTime={startTime}
      endDate={endDate}
      endTime={endTime}
      label={label}
    />
  {:else if tabs[activeTabIndex].handle === 'text'}
    <TextDisplay
      loadAnalyzedText={loadAnalyzedText}
      bind:currentPage={currentTextPage}
      bind:texts={texts}
      bind:searchText={searchText}
    />
  {/if}
</div>

<style type='scss'>
  div.tabs-column {
    display: flex;
    flex-direction: row;
    height: 78px;

    div.tabs {
      width: 100%;
      border: none;
      a {
        padding: 7px;
        border: none;
      }

      ul, li {
        border: none;
      }
    }
  }
</style>