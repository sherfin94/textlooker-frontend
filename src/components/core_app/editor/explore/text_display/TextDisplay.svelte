<script type='typescript'>
  import { onMount } from "svelte"
  import type { text } from "../../../../../interface"

  export let loadAnalyzedText: any
  export let currentPage: any
  export let texts: text[]
  export let searchText: string
  
  let tableContainer: HTMLElement
  let scroller: HTMLElement
  let scrollReloadlock = false
  
  onMount(async () => {
    await loadAnalyzedText()
    
    if (tableContainer) {
      tableContainer.onwheel = async (event: WheelEvent) => {
        event.stopPropagation()
        event.preventDefault()
        tableContainer.scrollBy(0, event.deltaY)
        const maxScrollTop = tableContainer.scrollHeight - tableContainer.clientHeight
        const ratio = tableContainer.scrollTop/maxScrollTop
        if (scroller)  scroller.style.top = `${ratio * 100}%`
        
        if (ratio >= 1 && !scrollReloadlock) {
          currentPage += 1
          let presentTextLength = texts.length
          await loadAnalyzedText()
          if (presentTextLength === texts.length)
            scrollReloadlock = true
        }
      }
    }
  })

  const keyPressHandler = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      texts = []
      currentPage = 1
      await loadAnalyzedText()
    }
  }

  $: {
    texts
    scrollReloadlock = false
  }

</script>

<div class="container">
  <div class="field search">
    <p class="control has-icons-left has-icons-right">
      <input class="input" type="text" placeholder="Search" bind:value={searchText} on:keypress={keyPressHandler}>
      <span class="icon is-small is-left">
        <span class="material-icons-outlined">
          search
        </span>
      </span>
    </p>
  </div>
  <div class="container text-display" bind:this={tableContainer}>
    {#if texts.length === 0}
      <p class="subtitle p-6">Current search term doesn't yield any results. <br />Please change the search term or the filters.</p>
    {:else}
      <div class="columns">
        <div class="column is-four-fifths table-column">

          <table class="table">
            <tbody>
              {#each texts as text}
              <tr>
                <td>{text.content}</td>
              </tr>
              {/each}
            </tbody>
          </table>

        </div>
        <div class="column is-one-fifth scroller-column">
          <div class="scroller" bind:this={scroller}></div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style type='scss'>
  div.container {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  table.table {
    background-color: white;
    width: 95%;
    font-family: monospace;
    color: black;
    font-size: large;
  }

  div.columns {
    margin: 0;
  }

  div.text-display {
    height: 400px;
    overflow-y: hidden;
  }

  div.table-column {
    width: 96%;
  }

  div.scroller-column {
    width: 2px;
    padding:0;
    background-color: aliceblue;
  }

  div.scroller {
    width: 2px;
    height: 10px;
    background-color: purple;
    position: relative;
  }

  div.search {
    width: 92.5%;
  }
</style>