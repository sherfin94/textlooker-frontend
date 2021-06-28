<script type='typescript'>
  import { onMount } from "svelte"
  import type { text } from "../../../../../interface"

  export let loadAnalyzedText: any
  export let currentPage: any
  export let texts: text[]
  
  let tableContainer: HTMLElement
  
  onMount(async () => {
    await loadAnalyzedText()
    
    if (tableContainer) {
      tableContainer.onwheel = async (event: WheelEvent) => {
        event.stopPropagation()
        event.preventDefault()
        tableContainer.scrollBy(0, event.deltaY)
        const maxScrollTop = tableContainer.scrollHeight - tableContainer.clientHeight
        const ratio = tableContainer.scrollTop/maxScrollTop
        
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
</div>

<style type='scss'>
  table.table {
    background-color: white;
    width: 100%;
    font-family: monospace;
    color: black;
    font-size: large;
  }

  div.text-display {
    height: 400px;
    overflow-y: hidden;
  }
</style>