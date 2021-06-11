<script lang='typescript'>
  import Table from './Table.svelte'

  export let indices: any[]
  export let columnSelectionCompleteCallback: any
  export let data:any

  let field = 'content'
  const fieldToRequestTextMapping = {
    content: ' text content to be analyzed',
    author: ' author name',
    date: ' date'
  }

  let handleIndexSubmission = (index:number) => {
    indices = [...indices, { index, field }]

    if(field === 'date') columnSelectionCompleteCallback()
    if(field === 'author') field = 'date'
    if(field === 'content') field = 'author'    
  }
</script>

<div>
  <h4 class="is-size-4">Click on the column that contains <span class='has-text-primary'>{fieldToRequestTextMapping[field]}</span></h4><br />
  <Table data={data.slice(1, 6)} titles={data[0]} giveIndex={handleIndexSubmission} bind:hide={indices}/>
</div>