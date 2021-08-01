<script lang='typescript'>
  import { onMount } from "svelte"

  import api from "../../../../api";
  import { today, now } from '../../../../util/date'
  import { getSource } from '../../../../models/source'
  import type { source } from "../../../../interface"


  export let sourceID: number
  let displayMessage = false
  let notificationClass: string
  let [content, author, date, time] = ['', '', today(), now()]
  let textarea: any
  let notificationText: string
  let loading = false

  let source: source
  
  let focusTextArea = () => {
    textarea.focus()
  }

  let submitText = async () => {
    loading = true
    if(content === '') {
      notificationText = 'Please provide content for your text'
      notificationClass = 'is-warning'
    } else {
      let textSet = [{
        content:content,
        ...(source.authorAvailable ? { author: author.split(',') } : {}),
        ...(source.dateAvailable ? { date } : {}),
        ...(source.dateAvailable ? { time } : {})
      }]
      let [status, savedCount] = await api.createText(textSet, sourceID)
      if(status && savedCount > 0) {
        notificationText = 'Text added successfully.'
        notificationClass = 'is-success'
        content = ''
        author = ''
      } else {
        notificationText = "This is an issue from our side, we'll inform you as soon as this is fixed. Meanwhile, please try to add data with different values"
        notificationClass = 'is-warning'
      }
    }
    
    focusTextArea()
    displayMessage = true
    loading = false
  }

  onMount(async () => {
    focusTextArea()
    source = await getSource(sourceID)
  })
</script>

<div class="container">
  <section class="section p-0">
    {#if displayMessage === true }
      <div class="notification {notificationClass} is-light mt-0">
        <button class="delete" on:click={() => displayMessage = false}></button>
        {notificationText}
      </div>
    {:else}
      <div class="notification mt-3 is-info is-light">
        Each text record can to contain upto 5000 letters.
      </div>
    {/if}
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Content" bind:value={content} rows={6} maxlength="5000" bind:this={textarea}></textarea>
      </div>
    </div>
    {#if source && (source.authorAvailable || source.dateAvailable)}
      <div class="columns">
        {#if source.authorAvailable}
          <div class="column">
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Author" bind:value={author}>
              </div>
            </div>
          </div>
        {/if}
        {#if source.dateAvailable}
          <div class="column">
            <div class="field">
              <div class="control">
                <input class="input" type="date" placeholder="Date" bind:value={date}>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <div class="control">
                <input class="input" type="time" placeholder="Time" bind:value={time}>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/if}
    <div class="control">
      <button class="button is-link {loading ? 'is-loading':''}" on:click={submitText}>Submit</button>
    </div>
  </section>
</div>