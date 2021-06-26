<script lang='typescript'>
  import type { countItem, filterItem } from '../../../../interface'

  import AggregationChart from './AggregationChart.svelte'
  import TextDisplay from './text_display/TextDisplay.svelte'

  export let data: countItem[]
  export let label: string
  export let selectedHandler: (item: string) => void
  export let sourceID: number
  export let filter: filterItem[]

  let tabs = [
    { handle: 'barchart', icon: 'bar_chart' },
    { handle: 'text', icon: 'text_snippet' },
  ]
  let activeTabIndex = 0

  let tabSelect = (index:number) => {
    activeTabIndex = index
  }
</script>

<div class="container">
  <div class="tabs is-centered">
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
  {#if tabs[activeTabIndex].handle === 'barchart' }
    <AggregationChart data={data} label={label} selectedHandler={selectedHandler} />
  {:else if tabs[activeTabIndex].handle === 'text'}
    <TextDisplay label={label} selectedHandler={selectedHandler} sourceID={sourceID} filter={filter}/>
  {/if}
</div>

<style type='scss'>
  div.tabs {
    width: 15%;
    a {
      padding: 7px;
    }
  }
</style>