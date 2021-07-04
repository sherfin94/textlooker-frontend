<script lang="typescript">
  import AddInsightToDashboardModal from './AddInsightToDashboardModal.svelte'
  import { onMount } from "svelte"
  import { Link } from 'svelte-navigator'
  import api from "../../../api";
  import type { insight } from "../../../interface"
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'
  import relativeTime from 'dayjs/plugin/relativeTime'
  dayjs.extend(customParseFormat)
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(relativeTime)
  
  import { notify } from "../../../models/notifications"

  const dateParseFormat = 'YYYY-MM-DDTHH:mmZ'

  export let sourceID: number
  export let loadInsight: any

  let insights: insight[] = []
  let loading = false
  let showModal = false
  let selectedInsightID: number = 0

  onMount(async () => {
    loading = true
    let status: boolean
    [status, insights] = await api.getInsights(sourceID)
    loading = false
  })

  const deleteInsight = async (insight: insight) => {
    loading = true
    let status: boolean
    status = await api.deleteInsight(sourceID, insight.id)

    if (status) {
      [status, insights] = await api.getInsights(sourceID)

      if (status) {
        notify(`Deleted insight titled '${insight.title}'`, 'success is-light')
      }
    }
    loading = false
  }

  const deleteClickHandler = (event: MouseEvent, insight: insight) => {
    event.preventDefault()
    event.stopPropagation()
    deleteInsight(insight)
  }

  const addClickHandler = (event: MouseEvent, insight: insight) => {
    event.preventDefault()
    event.stopPropagation()
    selectedInsightID = insight.id
    showModal = true
  }

  const insightAddedHandler = () => {
    notify("Insight added to dashboard.", 'success is-light')
  }
</script>

<div class="section px-0 pt-3">
  {#if insights.length !== 0}
    <div class="box">
      <table class="table is-striped">
        <colgroup>
          <col span="1" style="width: 60%;">
          <col span="1" style="width: 30%;">
          <col span="1" style="width: 10%;">
      </colgroup>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created</th>
            <th>Add to dashboard</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each insights as insight }
            <tr on:click={() => loadInsight(insight)}>
              <td>
                {insight.title}
              </td>
              <td class="date">
                <span class="relative">
                  {dayjs(insight.lastUpdated, dateParseFormat).fromNow()}
                </span>
                <span class="exact">
                  {dayjs(insight.lastUpdated, dateParseFormat).format()}
                </span>
              </td>
              <td>
                <div class="buttons">
                  <button class="button is-primary" on:click={(event) => addClickHandler(event, insight)}>Add</button>
                </div>
              </td>
              <td>
                <div class="buttons">
                  <button class="button is-danger" on:click={(event) => deleteClickHandler(event, insight)}>Delete</button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p class="p-3">
      You haven't created any insights. Head on to <Link to='../explore'> Explore </Link> and create some insights.
    </p>
  {/if}
  <AddInsightToDashboardModal insightAddedHandler={insightAddedHandler} sourceID={sourceID} insightID={selectedInsightID} bind:show={showModal} />
</div>

<style type="scss">
  table.table {
    width: 100%;

    tbody {
      tr:hover {
        background-color: aliceblue;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }

  td.date {
    span.exact {
      display: none;
    }
  }

  td.date:hover {
    span.relative {
      display: none;
    }

    span.exact {
      display: inline;
    }
  }
</style>