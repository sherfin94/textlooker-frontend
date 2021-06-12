<script lang='typescript'>
  import Table from './Table.svelte'

  export let indices: any[]
  export let columnSelectionCompleteCallback: any
  export let data:any

  let field = 'content'
  let skippable = false
  const fieldToRequestTextMapping = {
    content: ' text content to be analyzed',
    author: ' author name',
    date: ' date'
  }

  let progressToNextField = () => {
    if(field === 'date') columnSelectionCompleteCallback()
    if(field === 'author') field = 'date'
    if(field === 'content') {
      field = 'author'
      skippable = true
    }
  }

  let handleIndexSubmission = (index:number) => {
    indices = [...indices, { index, field }]
    progressToNextField()
  }
</script>

<div>
  <div class="columns">
    <div class="column is-four-fifths">
      <h4 class="is-size-4">Click on the column that contains <span class='has-text-primary'>{fieldToRequestTextMapping[field]}</span></h4><br />
    </div>
    <div class="column is-one-fifth">
      <button class="button is-info is-light {skippable ? '': 'is-hidden'}" on:click={progressToNextField}>Skip {field}</button>
    </div>
  </div>
  
  <Table data={data.slice(1, 6)} titles={data[0]} giveIndex={handleIndexSubmission} bind:hide={indices}/>
</div>