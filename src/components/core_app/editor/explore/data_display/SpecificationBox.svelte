<script lang='typescript'>
  import { onMount } from "svelte"
  import type { countItem, insight } from "../../../../../interface"
  import menu from '../menu'

  export let analyzedTextCount: number
  export let totalCountQualification: string
  export let data: countItem[]
  export let label: string
  export let insight: insight

  let specTableContainer: HTMLElement
  let specScroller: HTMLElement
  let displayScroller: boolean = false

  onMount(async () => {
    if (specTableContainer) {
      specTableContainer.onwheel = async (event: WheelEvent) => {
        event.stopPropagation()
        event.preventDefault()
        specTableContainer.scrollBy(0, event.deltaY)
        const maxScrollTop = specTableContainer.scrollHeight - specTableContainer.clientHeight
        const ratio = specTableContainer.scrollTop/maxScrollTop
        if (specScroller)  specScroller.style.top = `${ratio * (200-10)}px`
      }
    }
  })

  const itemCheckHandler = () => {
    insight = {...insight, ...{ saved: false }}
  }

  $: {
    if (data && data.length >= 4) {
      displayScroller = true
    } else {
      false
    }
  }
</script>

<div class="container mt-3 mx-0 mb-0 pt-3 pl-4 rootContainer">
  <div class="subtitle mb-2 has-text-weight-bold">
    Visualized {label && menu.find(item => item.handle === label).label}
    <span class="material-icons-outlined help-icon has-tooltip-top has-tooltip-multiline" data-tooltip="The table displays all the {label && menu.find(item => item.handle === label).label} that can be visualized. The detection system may make errors, so you can remove or add any of the items according to your intuition.">help</span>
  </div>
  <p class='mb-5'>
    Analyzed text count: <span class="textCount">
      {
        totalCountQualification === 'gte' ?
          'greater than'
        :
          totalCountQualification === 'lte' ?
            'less than'
          :
            ''
      }
      {analyzedTextCount}
    </span>
  </p>
  <div class="container">
    <div class="columns">
      <div class="column is-four-fifths specColumn" bind:this={specTableContainer}>
        <table class="table specTable">
          <thead>
            <tr>
              <th>Text</th>
              <th>Frequency</th>
              <th>Visualize</th>
            </tr>
          </thead>
          <tbody>
          {#if data}
            {#each data as item}
            <tr>
              <td><span class='specKey'>{item.key}</span></td>
              <td><span class="specValue">{item.count}</span></td>
              <td><input type="checkbox" bind:checked={item['show']} on:change={itemCheckHandler} /></td>
            </tr>
            {/each}
          {/if}
          </tbody>
        </table>
      </div>
      {#if displayScroller}
        <div class="column is-one-fifth specScrollerColumn">
          <div class="specScroller" bind:this={specScroller}></div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style type='scss'>
  span.textCount {
    color: purple;
    font-weight: bold;
  }

  span.specKey {
    color: #046586;
  }

  span.specValue {
    color: purple;
    font-size: 12px;
  }

  div.specColumn {
    width: 95%;
    height: 200px;
    overflow-y: hidden;
    padding-right: 0;
  }

  table.table {
    width: 100%;
    background-color: inherit;

    tr:nth-child(2n) {
      background-color:#f9f9f9;
    }

    th {
      background-color:#f9f9f9;
    }

    td, th {
      text-align: center;
      border: none;
      font-weight: 600;

      input {
        width: 20px;
        height: 20px;
      }
    }
  }

  div.specScrollerColumn {
    width: 2px;
    padding: 0;
    margin: 0;
    background-color: aliceblue;
  }

  div.specScroller {
    width: 2px;
    height: 10px;
    margin:0;
    padding:0;
    background-color: #e9e6e6;
    position: relative;
  }

  div.rootContainer {
    background-color: #fdfdfd;
  }

  span.help-icon {
    font-size: 15px;
    margin-left: 15px;
  }
</style>