<script lang='typescript'>
  import Table from './Table.svelte'
  import { getSource } from '../../../../../models/source'

  export let indices: any[]
  export let columnSelectionCompleteCallback: any
  export let data:any
  export let sourceID:number
  export let titleAvailable: boolean

  let source = getSource(sourceID)

  let field = 'content'
  let fieldsToBeCollected = [
    ...(source.authorAvailable ? ['author'] : []),
    ...(source.dateAvailable ? ['date'] : [])
  ]

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
</script>

<div>
  <h4 class="is-size-4">Click on the column that contains <span class='has-text-primary'>{fieldToRequestTextMapping[field]}</span></h4><br />
  <Table data={data.slice(1, 6)} giveIndex={handleIndexSubmission} bind:hide={indices} columnSelectable={true} titleRowPresent={titleAvailable}/>
</div>