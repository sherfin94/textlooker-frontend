<script lang='typescript'>
  import Papa from 'papaparse'
  let files: FileList
  export let data: any, errors: any
  export let fileSelectedCallback: any

  let handleFileChange = async () => {
    let text = await files[0].text()
    let parseResult = Papa.parse(text, {skipEmptyLines: true})
    data = parseResult.data
    errors = parseResult.errors
    fileSelectedCallback()
  }
</script>

<div>
  <h4 class="is-size-4">Select a CSV file</h4>
  <div class="notification mt-3 is-info is-light">
    Currently you can upload data from a CSV file. Each text record is expected to contain upto 5000 letters. Those that contain more will be trimmed down to 5000 letters.
  </div>
  <div class="file mt-3">
    <label class="file-label">
      <input class="file-input" type="file" name='resume' bind:files={files} accept=".csv" on:change={handleFileChange}>
      <span class="file-cta">
        <span class="file-icon">
          <span class="material-icons-outlined">
            file_upload
          </span>
        </span>
        <span class="file-label">
          Choose file
        </span>
      </span>
    </label>
  </div>
</div>