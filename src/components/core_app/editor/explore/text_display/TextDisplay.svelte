<script type='typescript'>
  import { onMount } from "svelte"
  import type { text } from "../../../../../interface"

  export let loadAnalyzedText: any
  export let currentPage: any
  export let texts: text[]
  
  let tableContainer: HTMLElement
  let scroller: HTMLElement
  
  onMount(async () => {
    await loadAnalyzedText()
    
    if (tableContainer) {
      tableContainer.onwheel = async (event: WheelEvent) => {
        event.stopPropagation()
        event.preventDefault()
        tableContainer.scrollBy(0, event.deltaY)
        const maxScrollTop = tableContainer.scrollHeight - tableContainer.clientHeight
        const ratio = tableContainer.scrollTop/maxScrollTop
        scroller.style.top = `${ratio * 100}%`
        
        if (ratio >= 1) {
          currentPage += 1
          loadAnalyzedText()
        }
      }
    }
  })

</script>

<div class="container">
  <div class="container text-display" bind:this={tableContainer}>
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
  </div>
</div>

<style type='scss'>
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
</style>