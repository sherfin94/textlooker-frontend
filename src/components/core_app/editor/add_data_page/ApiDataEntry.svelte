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
        ...(source.dateAvailable ? {date: '2013-09-29T18:46:19-07:00'} : {}),
      },
      {
        content: 'Content for the second text of batch',
        ...(source.authorAvailable ? {author: ['Author1']} : {}),
        ...(source.dateAvailable ? {date: '2013-09-30T18:46:19-07:00'} : {}),
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
    <span class="is-size-6 is-bold ml-2 monospace">https://textlooker.com/api/text</span><br /><br />
    <span class="is-size-6 header"> Content-Type :&nbsp</span> 
    <span class="is-size-6 has-text-primary"> application/json</span><br />
    <span class="is-size-6 token"> Token :&nbsp</span> 
    <span class="is-size-6 tokenCode"> {source.token}</span>
    
    <h4 class="subtitle is-6 mb-0 mt-4">Request JSON example</h4>
    <pre class='mt-3'>
      {@html requestJsonHtml}
    </pre>

    <h4 class="subtitle is-6 mb-0 mt-6">Response JSON</h4>
    <pre class='mt-3'>
      {@html responseJsonHtml}
    </pre>

    <h4 class="subtitle is-6 mb-0 mt-6">Request terms</h4>
    <table class="table terms is-bordered mt-3">
      <thead>
        <tr>
          <th>Key</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>token</td>
          <td>API access token for this source. For this source it is <span class='token'>{source.token}</span>.</td>
        </tr>
        <tr>
          <td>batch</td>
          <td>Contains an array of objects. Each of which has the following parameter{source.authorAvailable || source.dateAvailable ? 's' : ''}

            <table class="table inner is-striped mt-3">
              <tbody>
                <tr>
                  <td>content</td>
                  <td>Textual data which shall be analyzed by textlooker.</td>
                </tr>
                {#if source.authorAvailable}
                  <tr>
                    <td>author</td>
                    <td>Array which consists names of authors of the text. Even if there is only one author, please do pass the name on an array.</td>
                  </tr>
                {/if}
                {#if source.dateAvailable}  
                  <tr>
                    <td>date</td>
                    <td>
                      Date on which the corresponding text as produced. If you're giving date without time, set time to 00:00 and remember to keep the timezone constant.<br />
                      Date must be provided in the format:<br /> <span class='dateformat'>YYYY-MM-DDThh:mm:ssTZD</span><br />
                      <div class="content">
                        <ul>
                          <li><span class='token'>YYYY</span> : four-digit year</li>
                          <li><span class='token'>MM</span>   : two-digit month (01:January, etc.)</li>
                          <li><span class='token'>DD</span>   : two-digit day of month (01 through 31)</li>
                          <li><span class='token'>T</span>   : this is just a separator between date and time, provide the constant 'T' itself here</li>
                          <li><span class='token'>hh</span>   : two digits of hour (00 through 23) (am/pm NOT allowed)</li>
                          <li><span class='token'>mm</span>   : two digits of minute (00 through 59)</li>
                          <li><span class='token'>ss</span>   : two digits of second (00 through 59)</li>
                          <li><span class='token'>TZD</span>  : time zone designator (Z or +hh:mm or -hh:mm)</li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                {/if}
            </table>

          </td>
        </tr>
      </tbody>
    </table>
    <h4 class="subtitle is-6 mb-0 mt-6">Response terms</h4>
    <table class="table terms is-bordered mt-3">
      <thead>
        <tr>
          <th>Key</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>savedTextCount</td>
          <td>Number of text objects that TextLooker was able to successfully add from your request.</td>
        </tr>
        <tr>
          <td>lastOccuredError</td>
          <td>It is possible that TextLooker might not be able to save some text objects in your request,
            because of reasons such as not being able to parse the date. Since sending every error occured could make the
            response too heavy, we'll send the last occurred error which might help you fix the issue.
          </td>
        </tr>
      </tbody>
      </table>
  {/if}

</div>

<style type='scss' global>
  #apiSpec {
    pre {
      background-color: #f8fcff;
      border-radius: 6px;
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

    h4.subtitle {
      font-weight: bold;
    }

    span.tokenCode {
      color: coral;
    }

    table.terms {
      font-family: 'Courier New', Courier, monospace;

      span.token {
        color: crimson;
      }

      td:first-of-type {
        color: slateblue;
      }
    }

    table.inner {
      td,tr {
        border: none;  
      }
      border: none;
      
      th {
        border-bottom-width: 1px;
        border-top: none;
        border-left: none;
        border-right: none;
      }

      span.dateformat {
        font-weight: bold;
      }
    }
  }

</style>