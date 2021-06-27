<script type='typescript'>
  import Pagination from './Pagination.svelte'

  import { onMount } from "svelte"
  import api from "../../../../../api";
  import type { filterItem, source } from "../../../../../interface"
  import { fetchSources, getSource } from "../../../../../models/source"


  export let label: string
  export let selectedHandler: (item: string) => void
  export let sourceID: number
  export let filter: filterItem[]

  export let dateRangeAvailable: boolean
  export let startDate: string
  export let startTime: string
  export let endDate: string
  export let endTime: string

  let source: source
  let loading = true
  let texts:any[] = []
  let total:number = 0
  let currentPage = 1
  let availablePages = 1

  const loadAnalyzedText = async () => {
    loading = true
    source = getSource(sourceID)
    if (!source) {
      await fetchSources()
      source = getSource(sourceID)
    }

    let status: boolean
    if (dateRangeAvailable) {
      [status, total, texts] = await api.getAnalyzedText(sourceID, '*', (currentPage - 1)*20, true,  startDate, startTime, endDate, endTime, filter)
    } else {
      [status, total, texts] = await api.getAnalyzedText(sourceID, '*', (currentPage - 1)*20, false, '', '', '', '', filter)
    }
    availablePages = Math.ceil(total/20)
    loading = false
  }

  onMount(loadAnalyzedText)

  const paginationHandler = async (page: number) => {
    currentPage = page
    await loadAnalyzedText()
  }

  $: {
    filter
    dateRangeAvailable
    startDate
    startTime
    endDate
    endTime
    loadAnalyzedText()
  }

</script>

<div class="container">
  {#if loading}
    loading
  {:else}
    {#if availablePages > 1}
      <Pagination currentPage={currentPage} availablePages={availablePages} paginationHandler={paginationHandler} />
    {/if}
    <div class="container text-display">
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
  {/if}
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
    overflow-y: auto;
  }
</style>