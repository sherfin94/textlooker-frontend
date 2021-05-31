<script lang='typescript'>
  import { afterUpdate } from "svelte";

  import api from "../../../api";
  import { fetchSources } from '../../../models/source'


  export let on:boolean
  export let close
  export let loading:boolean = false
  let sourceName:string = ''
  let inputBox

  let handleCreate = async () => {
    loading = true
    const status = await api.createSource(sourceName)
    await fetchSources()
    sourceName = ''
    loading = false
    close()
  }

  let handleKeypress = (keyboardEvent:KeyboardEvent) => {   
    if(keyboardEvent.key === 'Enter') {
      handleCreate()
    }
  }

  afterUpdate(async () => {
    on && inputBox.focus()
  })


</script>

{#if on === true}
  <div class="modal is-active">
    <div class="modal-background" on:click={close}></div>
    <div class="modal-content">
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
              <button class="button is-info" on:click={close}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={close}></button>
  </div>
{/if}