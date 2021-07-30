<script lang="typescript">
  import Visualization from './Visualization.svelte'

  import { onMount } from 'svelte'
  import api from '../../../api'

  import type { dashboard } from '../../../interface'
  import NavBar from './nav_bar/NavBar.svelte'

  export let id: number
  export let token: string

  let loading = true

  let dashboard: dashboard
  const loadDashboard = async () => {
    loading = true
    let status: boolean
    [status, dashboard] = await api.getDashboardViaToken(id, token)
    loading = false
    await loadInsights()
  }

  let visualizationData = {}
  const loadInsights = async () => {
    dashboard.insightIDs.forEach(async insightID => {
      let [status , data] = await api.getInsightsAggregationViaToken(dashboard.id, insightID, token)
      if (status) {
        visualizationData[insightID] = {...data, ...{ available: true }}
      } else {
        visualizationData[insightID] = { available: false }
      }
    })
  }

  onMount(loadDashboard)
</script>

<div class="container">
  <NavBar />
  {#if loading}
  <progress class="progress"></progress>
  {:else}
  
  <p class="title is-size-3">
    {dashboard.title}
  </p>

    {#each dashboard.insightIDs as insightID, index}
      <div class="container insight">
        {#if visualizationData[insightID]}
          {#if visualizationData[insightID]['available']}
            <Visualization
              data={visualizationData[insightID]["data"]}
              type={visualizationData[insightID].visualizationType}
              canvasIndex={index}
              visualizeTexts={visualizationData[insightID]['visualizeTexts']}
              title={visualizationData[insightID]['title']}
              description={visualizationData[insightID]['description']}
            />
          {:else}
            <div class="notification is-warning">Unable to load this visualization. Please contact support.</div>
          {/if}
        {:else}
          <progress class="progress"></progress>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style type="scss">

  p.title {
    margin-bottom: 30px;
    margin-top: 50px;
  }

  div.insight {
    margin-bottom: 200px;
  }

  hr {
    margin: 0 0 30px 0;
  }

  div.container {
    margin: 0 auto;
    padding: 0 15px;
  }
</style>