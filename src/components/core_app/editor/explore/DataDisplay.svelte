<script lang='typescript'>
  import type { countItem, filterItem } from '../../../../interface'

  import AggregationChart from './AggregationChart.svelte'
  import TextDisplay from './text_display/TextDisplay.svelte'
  import Filter from './Filter.svelte'

  export let data: countItem[]
  export let label: string
  export let sourceID: number
  export let filter: filterItem[]
  export let loadAggregation: () => void

  let tabs = [
    { handle: 'barchart', icon: 'bar_chart' },
    { handle: 'text', icon: 'text_snippet' },
  ]
  let activeTabIndex = 0

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
    filterCount = countFilters()
    setTimeout(() => {
      scrollFilterRight && scrollFilterRight(10000)
    }, 10)
    await loadAggregation()
  }

  let deselect = async (index: number) => {
    filter = [...filter.slice(0, index), ...filter.slice(index+1)]
    filterCount = countFilters()
    await loadAggregation()
  }
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
        <Filter filter={filter} deselect={deselect} bind:scrollRight={scrollFilterRight}/>
      {/if}
    </div>
  </div>
  {#if tabs[activeTabIndex].handle === 'barchart' }
    <AggregationChart data={data} label={label} selectedHandler={selectHandler} />
  {:else if tabs[activeTabIndex].handle === 'text'}
    <TextDisplay label={label} selectedHandler={selectHandler} sourceID={sourceID} filter={filter}/>
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