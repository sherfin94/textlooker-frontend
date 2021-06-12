<script lang='typescript'>
  import DateFormatInput from './DateFormatInput.svelte'
  import Notification from './Notification.svelte'
  import FileSelectStage from './FileSelectStage.svelte'
  import ColumnsSelectStage from './ColumnsSelectStage.svelte'
  import api from '../../../../../api';
  import type dayjs from 'dayjs'
  import type { text } from '../../../../../interface'
  import { pluck } from '../../../../../util/array_operations'

  export let sourceID:number

  let [data, parseErrors]:[any, any] = [[], []]
  let stage = 'start'

  let fileSelectHandler = async () => {
    stage = 'select'
  }

  let indices = [], dateAvailable = false, authorAvailable = false
  let columnSelectHandler = async () => {
    let fields = pluck(indices, 'field')

    if(fields.includes('date'))
      dateAvailable = true
    if(fields.includes('author'))
      authorAvailable = true

    if (dateAvailable) {
      stage = 'dateformat'
    } else {
      console.log('went to upload data')
      uploadData()
    }
  }

  let dateFormatSelectHandler = () => {
    if (invalidDates() > 0) showInvalidDateModal()
    else {
      uploadData()
    }
  }
  

  let column = (field:string) => {
    let index = indices.filter(index => index.field === field)[0].index
    return data.map(row => row[index]).slice(1)
  }

  let displayModal = false
  let notificationText = ''

  let parsedDates:dayjs.Dayjs[]
  let submissionData: text[] = []

  let generateSubmissionData = () => {
    let contentColumn = column('content')
    let authorColumn = authorAvailable ? column('author') : []
    let dateColumn = dateAvailable ? parsedDates : []

    submissionData = data.slice(1).map((_:any, index:number) => ({
        ...{content: contentColumn[index]},
        ...(authorAvailable && authorColumn[index] != undefined ? {author: authorColumn[index].split(',')} : {}),
        ...(dateAvailable && dateColumn[index].isValid() ? {date: dateColumn[index].format('YYYY-MM-DD')} : {}),
        ...(dateAvailable && dateColumn[index].isValid() ? {time: dateColumn[index].format('HH:mm')} : {})
    }))
  }

  let invalidDates = ():number => parsedDates.filter(date => !date.isValid()).length

  let showInvalidDateModal = () => {
    displayModal = true
    notificationText = 
      `Out of ${parsedDates.length} records, 
      ${invalidDates()} dates could not be parsed. Would you like to modify the date format 
      or proceed with ${parsedDates.length - invalidDates()} records?`
  }
  

  let progress = 0.0
  let uploaded = 0
  let uploadData = async () => {
    generateSubmissionData()
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
    <FileSelectStage bind:data={data} bind:errors={parseErrors} fileSelectedCallback={fileSelectHandler} />
  {/if}
  {#if stage === 'select'}
    <ColumnsSelectStage bind:indices={indices} data={data} columnSelectionCompleteCallback={columnSelectHandler} sourceID={sourceID}/>
  {/if}
  {#if stage === 'dateformat'}
    <DateFormatInput data={column('date')} bind:parsedDates={parsedDates} />
    <div class="container is-flex is-justify-content-center">
      <button class="button is-primary mt-5" on:click={dateFormatSelectHandler}>Add data to source</button>
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