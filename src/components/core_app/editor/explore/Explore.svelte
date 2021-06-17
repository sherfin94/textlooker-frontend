<script lang='typescript'>
import { onMount } from 'svelte'
import api from '../../../../api'
import AggregationChart from './AggregationChart.svelte'

  import SideBar from './SideBar.svelte'
  export let sourceID: number
  let selectedMenuItem:string
  let loading = false
  let dataReady = false
  let aggregation: any

  onMount(async () => {
    loading = true
    let status
    [status, aggregation] = await api.getDatelessAggregation(sourceID, '*', [], [], [])
    dataReady = status
    loading = false
  })

</script>

<section class="section px-0 pt-0">
  <div class="container">
    <div class="columns">
      <div class="column is-one-fifth">
        <SideBar bind:selected={selectedMenuItem} />
      </div>
      <div class="column is-four-fifths">
        <div class="box">
          {#if dataReady}
          <AggregationChart data={aggregation[selectedMenuItem]} label={selectedMenuItem} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>