<script lang='typescript'>
  import Table from './Table.svelte'
  import Papa from 'papaparse'

  export let sourceID:number
  let files: FileList
  let data: any, errors: any

  let handleFileChange = async () => {
    let text = await files[0].text()
    let parseResult = Papa.parse(text)
    data = parseResult.data
    errors = parseResult.errors
  }
</script>

<div class="container">
  <h4 class="is-size-4">Select a CSV file</h4>
  <div class="file has-name mt-3 { files ? 'is-info' : ''}">
    <label class="file-label">
      <input class="file-input" type="file" name='resume' bind:files={files} accept=".csv" on:change={handleFileChange}>
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          { files ? 'Change file':'Choose file' }
        </span>
      </span>
        {#if files }
        <span class="file-name">
          {files[0].name}
        </span>
        {/if}
    </label>
  </div>
  {#if data}
    <Table data={data.slice(1, 6)} titles={data[0]} />
  {/if}
</div>