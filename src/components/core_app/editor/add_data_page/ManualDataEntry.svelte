<script lang='typescript'>
import { onMount } from "svelte";

  import api from "../../../../api";
  import { today, now } from '../../../../util/date'
  import { getSource } from '../../../../models/source'


  export let sourceID: number
  let displayMessage = false
  let notificationClass: string
  let [content, author, date, time] = ['', '', today(), now()]
  let textarea: any
  let notificationText: string

  let source = getSource(sourceID)
  
  let focusTextArea = () => {
    textarea.focus()
  }

  let submitText = async () => {

    let textSet = [{
      content:content,
      author: author.split(','),
      date: date,
      time: time
    }]
    let status = await api.createText(textSet, sourceID)
    if(status) {
      notificationText = 'Text added successfully.'
      notificationClass = 'is-success'
      content = ''
    } else {
      notificationText = 'Could not add text. Please make sure that the content is not empty'
      notificationClass = 'is-warning'
    }
    displayMessage = true
    focusTextArea()
  }

  onMount(focusTextArea)
</script>

<div class="container">
  <section class="section p-0">
    {#if displayMessage === true }
      <div class="notification {notificationClass} is-light mt-0">
        <button class="delete" on:click={() => displayMessage = false}></button>
        {notificationText}
      </div>
    {/if}
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Content" bind:value={content} rows={6} bind:this={textarea}></textarea>
      </div>
    </div>
    {#if source.authorAvailable || source.dateAvailable}
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
      <button class="button is-link" on:click={submitText}>Submit</button>
    </div>
  </section>
</div>