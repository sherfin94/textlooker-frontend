<script lang='typescript'>
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'

  dayjs.extend(customParseFormat)
  dayjs.extend(utc)
  dayjs.extend(timezone)

  export let data: any[]
  let format:string = ''
  export let parsedDates:dayjs.Dayjs[]
  let userTimezone = dayjs.tz.guess()

  let parse = (date: string, format:string):string => {
    let result = dayjs(date, format).tz(userTimezone)
    return result.format('ddd, D MMM, YYYY hh:mm A')
  }

  export let dateFormatSelectHandler: any

  let loading = false
  let submitHandler = () => {
    loading = true
    parsedDates = data.map(date => dayjs(date, format).tz(userTimezone))
    loading = false
    dateFormatSelectHandler()
  }

  $: {
    parsedDates = data.slice(0, 10).map(date => dayjs(date, format).tz(userTimezone))
  }
</script>

<div class="container">
  <h4 class="is-size-4">Enter the format to parse your date/time field</h4><br />
  <div class="columns is-centered">
    <div class="column">
      <input type="text" class="input" placeholder="Format" bind:value={format} />
      <article class="notification is-info is-light is-size-7 mt-4">
        <div class="content">
          <ul class="is-lower-alpha">
            <li>The table contains a sample of dates from your date column and their parsed version in your local timezone({dayjs.tz.guess()}), please make sure that the parsed dates are accurate.</li>
            <li>If they're not accurate, please provide the format to parse them accurately.</li>
            <li><b>Example</b>: DD/MM/YY hh:mm A.</li>
            <li>
              <a target='_' href='https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens'>
                Full list of parsing tokens and definitions.
              </a>
            </li>
          </ul>
        </div>
      </article>
    </div>
    <div class="column">
      <table class="table is-size-7">
        <thead>
          <tr>
            <th>Given value</th>
            <th>Parsed value</th>
          </tr>
        </thead>
        <tbody>
          {#each data.slice(0,10) as date}
          <tr>
            <td>{date}</td>
            <td>{parse(date, format)}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <div class="container is-flex is-justify-content-center">
    <button class="button is-primary mt-5 {loading ? 'is-loading' : ''}" on:click={submitHandler}>Add data to source</button>
  </div>
</div>

<style type='scss'>
  table.table {
    margin: 0 auto;
  }
</style>