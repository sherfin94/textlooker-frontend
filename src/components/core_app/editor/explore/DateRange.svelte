<script lang='typescript'>
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'
  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'
  import { onMount } from 'svelte'

  dayjs.extend(customParseFormat)
  dayjs.extend(utc)
  dayjs.extend(timezone)

  let startDate: string
  let startTime: string
  let endDate: string
  let endTime: string

  // const userTimezone = dayjs.tz.guess()

  let resetDateRange = () => {
    startDate = '0001-01-01'
    startTime = '00:00'
    endDate = dayjs().format('YYYY-MM-DD')
    endTime = dayjs().format('HH:mm')
  }


  let dateRangeAvailable = false
  
  onMount(resetDateRange)


</script>

<div class="box">
    <div class="field">
      <input id="dateRangeAvailable" type="checkbox" name="dateRangeAvailable" class="switch is-small is-info" bind:checked={dateRangeAvailable} on:change={resetDateRange}>
      <label for="dateRangeAvailable">Date range</label>
    </div>
  {#if dateRangeAvailable}
    <aside class="menu">
      <p class="menu-label">
        Between
      </p>
      <div class="container">
        <input type="date" bind:value={startDate} />
        <input type="time" bind:value={startTime} />
        <!-- <div class="notification is-info is-light">
          {dayjs(startDate, 'YYYY-MM-DD').tz(userTimezone).toString()}
        </div> -->
      </div>
      <p class="menu-label">
        And
      </p>
      <div class="container">
        <input type="date" bind:value={endDate} />
        <input type="time" bind:value={endTime} />
        <!-- <div class="notification is-info is-light">
          {dayjs(endDate, 'YYYY-MM-DD').tz(userTimezone).toString()}
        </div> -->
      </div>
    </aside>
  {/if}
</div>

<style type='scss'>
  input[type=date] {
    width: 100%;
    margin-bottom: 4px;
  }

  input[type=time] {
    width: 100%;
  }

  .switch[type="checkbox"].is-small + label {
    font-size: 0.85rem;
  }

  div.notification {
    visibility: hidden;
    position: absolute;
    width: 200px;
    left: 102%;
    z-index: 100;
    height: 80px;
    bottom: 20%;
    padding: 10px;
    margin: 0;
  }

  div.container:hover {
    @keyframes fadeIn {
      0%   {opacity: 0.2;}
      25%  {opacity: 0.4;}
      50%  {opacity: 0.6;}
      100% {opacity: 1;}
    }
    div.notification {
      visibility: visible;
      animation-name: fadeIn;
      animation-duration: 100ms;
    }
  }
</style>