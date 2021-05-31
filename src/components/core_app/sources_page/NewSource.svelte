<script lang='typescript'>
  import { afterUpdate } from "svelte";

  import api from "../../../api";
  import { fetchSources } from '../../../models/source'


  export let on:boolean
  export let close
  export let loading:boolean = false
  let sourceName:string = ''
  let inputBox
  let showIssue = false

  let handleCreate = async () => {
    loading = true
    const status = await api.createSource(sourceName)
    if(status) {
      await fetchSources()
      sourceName = ''
      close()
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
            <p>Unable to create source</p>
          </div>
          <div class="message-body">
            Source could not be created. Possibly because there is another source by the same name. Please contact support if this is not the reason.          
          </div>
        </article>
      {/if}
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="title">Create a new source</div>
            <input
              bind:this={inputBox}
              class="input"
              type="text"
              placeholder="Source name"
              bind:value={sourceName}
              on:keypress={handleKeypress}
            />
          </div>
          <div class="container">
            <div class="buttons">
              <button class="button is-primary {loading ? 'is-loading' : ''}" on:click={handleCreate}>Create</button>
              <button class="button is-info" on:click={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={handleClose}></button>
  </div>
{/if}