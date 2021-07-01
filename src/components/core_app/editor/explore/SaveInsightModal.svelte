<script lang='typescript'>
  import { afterUpdate } from "svelte"
  import api from "../../../../api"
  import type { filterItem } from "../../../../interface"


  export let on:boolean
  export let close: any
  export let insightCreatedHandler: any
  let loading:boolean = false
  export let sourceID: number
  export let filter: filterItem[]
  export let visualizeTexts: string[]
  export let lookForHandle: string
  export let dateRangeAvailable: boolean
  export let visualizationType: string
  export let startDate: string, startTime: string, endDate: string, endTime: string
  let insightTitle:string = ''
  let inputBox
  let showIssue = false

  let handleCreate = async () => {
    loading = true
    const status = await api.postInsight(
      sourceID,
      insightTitle,
      filter,
      visualizeTexts,
      visualizationType,
      lookForHandle,
      dateRangeAvailable,
      startDate, startTime,
      endDate, endTime
    )
    if(status) {
      close()
      insightCreatedHandler(insightTitle)
      showIssue = false
    } else {
      showIssue = true
    }
    loading = false
  }

  let handleKeypress = (keyboardEvent:KeyboardEvent) => {   
    if(keyboardEvent.key === 'Enter') {
      handleCreate()
    }
  }

  let handleClose = () => {
    showIssue = false
    close()
  }

  afterUpdate(() => {
    on && inputBox.focus()
  })


</script>

{#if on === true}
  <div class="modal is-active">
    <div class="modal-background" on:click={handleClose}></div>
    <div class="modal-content">
      {#if showIssue === true}
        <article class="message is-warning">
          <div class="message-header">
            <p>Unable to save insight</p>
          </div>
          <div class="message-body">
            Insight could not be saved. Please contact support if this is not the reason.          
          </div>
        </article>
      {/if}
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="title">Save insight</div>
            <input
              bind:this={inputBox}
              class="input"
              type="text"
              placeholder="Title"
              bind:value={insightTitle}
              on:keypress={handleKeypress}
            />
          </div>
          <div class="container mt-5">
            <div class="buttons">
              <button class="button is-primary {loading ? 'is-loading' : ''}" on:click={handleCreate}>Save</button>
              <button class="button is-info" on:click={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={handleClose}></button>
  </div>
{/if}