<script lang="typescript">
  import AggregationChart from '../editor/explore/data_display/AggregationChart.svelte'
  import PieChart from '../editor/explore/data_display/PieChart.svelte'

  export let data: any
  export let type: string
  export let canvasIndex: number
  export let visualizeTexts: string
  export let title: string
  export let description: string
</script>

<div class="container">
  <p class="subtitle mb-2">
    {title}
  </p>
  <p class="content mb-5">
    {description}
  </p>
  {#if type === 'barchart'}
    <AggregationChart
      data={data.filter(item => visualizeTexts.includes(item.key))}
      selectedHandler={() => {}}
      canvasIndex={canvasIndex}
      allowRotation={true}
    />
  {:else if type === 'piechart'}
    <PieChart
        data={data.filter(item => visualizeTexts.includes(item.key))}
        selectedHandler={() => {}}
        canvasIndex={canvasIndex}
      />
  {/if}
</div>

<style type="scss">

  div.container {
    margin-bottom: 60px;
  }

  p.subtitle {
    font-weight: 600;
    font-size: 6;
  }

  hr {
    margin-top: 0;
    margin-bottom: 30px;
  }
</style>