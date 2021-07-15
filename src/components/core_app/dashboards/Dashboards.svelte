<script lang="typescript">

  import CreateDashboardModal from './CreateDashboardModal.svelte'

  import { onMount } from "svelte"
  import api from "../../../api";
  import type { dashboard } from "../../../interface"
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

  let dashboards: dashboard[] = []
  let loading = false
  let showModal = false

  const loadDashboards = async () => {
    loading = true
    let status: boolean
    [status, dashboards] = await api.getDashboards(sourceID)
    loading = false
  }

  onMount(loadDashboards)

  const deleteDashboard = async (dashboard: dashboard) => {
    loading = true
    let status: boolean
    status = await api.deleteDashboard(sourceID, dashboard.id)

    if (status) {
      notify("Deleted dashboard titled '" + dashboard.title + "'", 'success is-light')
      await loadDashboards()
    }
    loading = false
  }

  const deleteClickHandler = (event: MouseEvent, dashboard: dashboard) => {
    event.preventDefault()
    event.stopPropagation()
    deleteDashboard(dashboard)
  }

  const handleDashboardCreation = async (title: string) => {
    showModal = false
    await loadDashboards()
    notify("Dashboard '" + title + "' created.", 'success is-light')
  }

  const open = (dashboard: dashboard) => {
    const url = '/dashboard/' + dashboard.id + '/' + dashboard.token
    window.open(url, '_blank').focus()
  }
</script>

<div class="section px-0 pt-3">
  {#if dashboards.length !== 0}
    <div class="box">
      <div class="container is-flex mb-2 is-align-items-flex-end is-flex-direction-column">
        <button class="button is-success" on:click={() => showModal = true}>
          Create dashboard
        </button>
      </div>
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {#each dashboards as dashboard }
            <tr on:click={() => open(dashboard)}>
              <td>
                {dashboard.title}
              </td>
              <td class="date">
                <span class="relative">
                  {dayjs(dashboard.lastUpdated, dateParseFormat).fromNow()}
                </span>
                <span class="exact">
                  {dayjs(dashboard.lastUpdated, dateParseFormat).format()}
                </span>
              </td>
              <td>
                <div class="buttons">
                  <button class="button is-danger" on:click={(event) => deleteClickHandler(event, dashboard)}>Delete</button>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="container mt-2 create-dashboard-button-when-there-are-none-container">
      <button class="button is-success" on:click={() => showModal = true}>
        Create the first dashboard
      </button>
    </div>
  {/if}
  <CreateDashboardModal sourceID={sourceID} bind:show={showModal} dashboardCreatedHandler={handleDashboardCreation} />
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

  div.create-dashboard-button-when-there-are-none-container {
    display: flex;
    margin-top: 50px;

    button {
      margin: 0 auto;
      height: 50px;
      font-weight: bold;
    }
  }

</style>