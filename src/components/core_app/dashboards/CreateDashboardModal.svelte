<script lang='typescript'>
  import { afterUpdate } from "svelte"
  import api from "../../../api"


  export let show:boolean
  let loading:boolean = false
  export let sourceID: number
  export let dashboardCreatedHandler: any
  let title:string = ''
  let inputBox
  let showIssue = false

  let handleCreate = async () => {
    loading = true
    const status = await api.postDashboard(
      sourceID,
      title,
    )
    if(status) {
      close()
      dashboardCreatedHandler(title)
      showIssue = false
    } else {
      showIssue = true
    }
    title = ''
    loading = false
  }

  let handleKeypress = (keyboardEvent:KeyboardEvent) => {   
    if(keyboardEvent.key === 'Enter') {
      handleCreate()
    }
  }

  let handleClose = () => {
    showIssue = false
    show = false
  }

  afterUpdate(() => {
    show && inputBox.focus()
  })


</script>

{#if show}
  <div class="modal is-active">
    <div class="modal-background" on:click={handleClose}></div>
    <div class="modal-content">
      {#if showIssue === true}
        <article class="message is-warning">
          <div class="message-header">
            <p>Unable to save dashboard</p>
          </div>
          <div class="message-body">
            Dashboard could not be saved. Please contact support if this is not the reason.          
          </div>
        </article>
      {/if}
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="title">Create dashboard</div>
            <input
              bind:this={inputBox}
              class="input"
              type="text"
              placeholder="Title"
              bind:value={title}
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