<script lang='typescript'>
  import { onMount } from 'svelte';
  import type { source } from '../../../../interface'

  import { getSource, fetchSources } from '../../../../models/source'
  import syntaxHighlight from '../../../../util/syntax-highlight'

  export let sourceID: number

  let source: source
  let loading = true
  let requestJsonHtml: string, responseJsonHtml: string

  let generateRequestObject = () => ({
    token: source.token,
    batch: [
      {
        content: 'Content for the first text of batch',
        ...(source.authorAvailable ? {author: ['Author1', 'Author2']} : {}),
        ...(source.dateAvailable ? {date: '2013-09-29T18:46:19-0700'} : {}),
      },
      {
        content: 'Content for the second text of batch',
        ...(source.authorAvailable ? {author: ['Author1']} : {}),
        ...(source.dateAvailable ? {date: '2013-09-29T18:46:19-0700'} : {}),
      },
    ]
  })

  onMount(async () => {
    source = getSource(sourceID)
    if (source === undefined) {
      loading = true
      let status = await fetchSources()
      source = getSource(sourceID)
    }
    let requestObject = generateRequestObject()
    requestJsonHtml = syntaxHighlight(requestObject)
    responseJsonHtml = syntaxHighlight({savedTextCount: 2, lastOccuredError:''})
    loading = false
  })


</script>

<div class="container" id='apiSpec'>
  <h4 class="title is-4">Add text via API</h4>

  {#if loading}
    <progress max={100} class='is-success'></progress>
  {:else}
    <span class="is-size-6 has-text-weight-bold has-text-danger">POST</span>
    <span class="is-size-6 is-bold ml-2 monospace">https://textlooker.com/api/text</span><br />
    <span class="is-size-6 header"> Content-Type :&nbsp</span> 
    <span class="is-size-6 has-text-primary"> application/json</span>
    
    <h4 class="subtitle is-6 mb-0 mt-3">Request JSON</h4>
    <hr class='m-0'>
    <pre class='mt-3'>
      {@html requestJsonHtml}
    </pre>

    <h4 class="subtitle is-6 mb-0 mt-3">Response JSON</h4>
    <hr class='m-0'>
    <pre class='mt-3'>
      {@html responseJsonHtml}
    </pre>
  {/if}

</div>

<style type='scss' global>
  #apiSpec {
    pre {
      background-color: #f8fcff;
      border-radius: 5px;
      span.string { color: #1b8592 !important; }
      span.code-number { color: darkorange !important; }
      span.boolean { color: blue !important; }
      span.null { color: magenta !important; }
      span.key { color: #37800e !important; }
    }

    span.monospace {
      font-family: 'Courier New', Courier, monospace;
    }

    div.panel-block {
      background-color: aliceblue;
    }

    span.header {
      color:blueviolet;
    }

    div.code-block {
      width: 100%;
      pre {
        background-color: inherit;
      }
    }
  }

</style>