<script lang='typescript'>
  import Table from './Table.svelte'
  import Papa from 'papaparse'
  import DateFormatInput from './DateFormatInput.svelte'
  import Notification from './Notification.svelte'
  import api from '../../../../../api';
  import type dayjs from 'dayjs'
  import type { text } from '../../../../../interface'

  export let sourceID:number
  let files: FileList
  let data: any, errors: any
  let stage = 'start'

  let handleFileChange = async () => {
    let text = await files[0].text()
    let parseResult = Papa.parse(text)
    data = parseResult.data
    errors = parseResult.errors
    stage = 'select'
  }

  let indices = []
  let field = 'content'
  const fieldToRequestTextMapping = {
    content: ' text content to be analyzed',
    author: ' author name',
    date: ' date'
  }

  let handleIndexSubmission = (index:number) => {
    indices = [...indices, { index, field }]

    if(field === 'date') stage = 'dateformat'
    if(field === 'author') field = 'date'
    if(field === 'content') field = 'author'    
  }

  let column = (field:string) => {
    let index = indices.filter(index => index.field === field)[0].index
    return data.map(row => row[index]).slice(1)
  }

  let displayModal = false
  let notificationText = ''

  let parsedDates:dayjs.Dayjs[]
  let submissionData: text[] = []

  let handleDataSubmit = () => {
    let contentColumn = column('content')
    let authorColumn = column('author')
    let dateColumn = parsedDates
    
    data.slice(1).map((_:any, index:number) => {
      let parsedDate = parsedDates[index]
      if(parsedDate.isValid()) {
        let content = contentColumn[index]
        let author = authorColumn[index].split(',')
        let date = parsedDates[index].format('YYYY-MM-DD')
        let time = parsedDates[index].format('HH:mm')
        submissionData = [...submissionData, { content, author, date, time}]
      }
    })

    let invalidDateCount = dateColumn.filter(date => !date.isValid()).length
    if(invalidDateCount > 0) {
      displayModal = true
      notificationText = `Out of ${dateColumn.length} records, ${invalidDateCount} dates could not be parsed. Would you like to modify the date format or proceed with ${dateColumn.length - invalidDateCount} records?`
    }
  }

  let progress = 0.0
  let uploaded = 0
  let uploadData = async () => {
    displayModal = false
    stage = 'uploading'
    let [status, savedTextCount] = await api.createText(submissionData, sourceID)
    if(status) {
      stage = 'success'
      uploaded = savedTextCount
    } else {
      stage = 'failure'
    }
  }
</script>

<div class="container">
  {#if stage === 'start'}
    <h4 class="is-size-4">Select a CSV file</h4>
    <div class="file mt-3">
      <label class="file-label">
        <input class="file-input" type="file" name='resume' bind:files={files} accept=".csv" on:change={handleFileChange}>
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose file
          </span>
        </span>
      </label>
    </div>
  {/if}
  {#if stage === 'select'}
    <h4 class="is-size-4">Click on the column that contains <span class='has-text-primary'>{fieldToRequestTextMapping[field]}</span></h4><br />
    <Table data={data.slice(1, 6)} titles={data[0]} giveIndex={handleIndexSubmission} bind:hide={indices}/>
  {/if}
  {#if stage === 'dateformat'}
    <DateFormatInput data={column('date')} bind:parsedDates={parsedDates} />
    <div class="container is-flex is-justify-content-center">
      <button class="button is-primary mt-5" on:click={handleDataSubmit}>Add data to source</button>
    </div>
  {/if}
  {#if stage === 'uploading'}
    <h3 class="title is-size-4">Upload in progress</h3>
    <progress class="progress is-primary" max="100"></progress>
  {/if}
  {#if stage === 'success'}
    <div class="notification is-light is-success m-0">
      Successfully uploaded {uploaded} out of {data.length - 1} records.
    </div>
  {/if}
  {#if stage === 'failure'}
    <div class="notification is-light is-warning m-0">
      <!-- svelte-ignore a11y-missing-attribute -->
      Upload failed, please <a on:click={() => stage = 'start'}>try again.</a>
    </div>
  {/if}
  <Notification show={displayModal} message={notificationText} close={() => displayModal = false} actionHandler={uploadData} />
</div>