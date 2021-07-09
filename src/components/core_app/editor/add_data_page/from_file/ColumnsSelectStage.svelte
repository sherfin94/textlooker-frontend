<script lang='typescript'>
  import Table from './Table.svelte'
  import { getSource } from '../../../../../models/source'
  import { onMount } from 'svelte'
  import type { source } from '../../../../../interface'

  export let indices: any[]
  export let columnSelectionCompleteCallback: any
  export let data: any
  export let sourceID: number
  export let titleAvailable: boolean

  let source: source

  let field = 'content'
  let fieldsToBeCollected = []
  
  const fieldToRequestTextMapping = {
    content: ' text content to be analyzed',
    author: ' author name',
    date: ' date'
  }
  
  let progressToNextField = () => {
    if (fieldsToBeCollected.length > 0) {
      field = fieldsToBeCollected.shift()
    } else columnSelectionCompleteCallback()
  }
  
  let handleIndexSubmission = (index:number) => {
    indices = [...indices, { index, field }]
    progressToNextField()
  }
  
  let loading = true
  onMount(async () => {
    loading = true
    source = await getSource(sourceID)
     fieldsToBeCollected = [
      ...(source.authorAvailable ? ['author'] : []),
      ...(source.dateAvailable ? ['date'] : [])
    ]
    loading = false
  })
</script>

<div>
  {#if loading}
    <p>loading</p>
  {:else}
    <h4 class="is-size-4">Click on the column that contains <span class='has-text-primary'>{fieldToRequestTextMapping[field]}</span></h4><br />
    <Table data={data} giveIndex={handleIndexSubmission} bind:hide={indices} columnSelectable={true} titleRowPresent={titleAvailable}/>
  {/if}
</div>