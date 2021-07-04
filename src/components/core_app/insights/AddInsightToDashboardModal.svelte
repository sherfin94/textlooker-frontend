<script lang='typescript'>
  import { afterUpdate, onMount } from "svelte"
  import api from "../../../api"
  import type { dashboard } from "../../../interface"


  export let show:boolean
  let loading:boolean = false
  export let sourceID: number
  export let insightAddedHandler: any
  export let insightID: number
  let dashboardID: number = 0
  let inputBox
  let showIssue = false
  let dashboards: dashboard[] = []
  let issueMessage: string = "Could not handle request. Please contact support."

  const dashboardSelectHandler = () => {
    dashboardID = parseInt(inputBox.value)
  }

  let handleAdd = async () => {
    loading = true
    const status = await api.addinsightToDashboard(
      sourceID,
      dashboardID,
      insightID
    )
    if(status) {
      show = false
      insightAddedHandler()
      showIssue = false
    } else {
      issueMessage = 'Something went wrong. Please try again on contact support'
      showIssue = true
    }
    dashboardID = 0
    loading = false
  }

  let handleKeypress = (keyboardEvent:KeyboardEvent) => {   
    if(keyboardEvent.key === 'Enter') {
      handleAdd()
    }
  }

  let handleClose = () => {
    showIssue = false
    show = false
  }

  afterUpdate(() => {
    show && inputBox && inputBox.focus()
  })

  const fetchDashboards = async () => {
    loading = true
    let status: boolean
    [status, dashboards] = await api.getDashboards(sourceID)

    if (!status) {
      issueMessage = 'Could not load dashboards. Please try again or contact support.'
      showIssue = true
    }
    if (dashboards.length !== 0) {
      dashboardID = dashboards[0].id
    }
    loading = false
  }

  onMount(fetchDashboards)


</script>

{#if show}
  <div class="modal is-active">
    <div class="modal-background" on:click={handleClose}></div>
    <div class="modal-content">
      {#if showIssue === true}
        <article class="message is-warning">
          <div class="message-header">
            <p>{issueMessage}</p>
          </div>
          <div class="message-body">
            Dashboard could not be saved. Please contact support if this is not the reason.          
          </div>
        </article>
      {/if}
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="title">Add insight to dashboard</div>
            {#if loading}
              <progress class="progress"></progress>
            {:else if dashboards.length === 0}
              <p class="subtitle">
                You haven't created any dashboards for this source. Head on to dashboards and create a dashboard.
              </p>
            {:else}
              <!-- svelte-ignore a11y-no-onchange -->
              <div class="select is-rounded">
                <select bind:this={inputBox} on:change={dashboardSelectHandler}>
                  {#each dashboards as dashboard}
                    <option value={dashboard.id}> {dashboard.title} </option>
                  {/each}
                </select>
              </div>
            {/if}
          </div>
          <div class="container mt-5">
            <div class="buttons">
              <button class="button is-primary {loading ? 'is-loading' : ''}" on:click={handleAdd}>Save</button>
              <button class="button is-info" on:click={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={handleClose}></button>
  </div>
{/if}

<style type="scss">
  div.select {
    width: 100%;
    select {
      width: 100%;
    }
  }
</style>