<script lang='typescript'>
  import { onMount } from 'svelte'
  import * as ChartJs from 'chart.js'
  import type { countItem } from '../../../../interface'
  import generateChartData from './generate_chart_data'
  
  ChartJs.Chart.register.apply(
    null,
    Object.values(ChartJs).filter((chartClass => 'id' in chartClass)),
    )

  export let data: countItem[]
  export let label: string
  let chart: ChartJs.Chart<"bar", number[], string>
  let canvasContext: any

  $: {
    if (chart) {
      chart.data = generateChartData(data)
      chart.update()
    }
  }

  onMount(async () => {
    canvasContext = document.getElementById('myChart').getContext('2d');
    canvasContext.height = 200;
    chart = new ChartJs.Chart(canvasContext, {
      type: 'bar',
      data: generateChartData(data),
      options: {
        maintainAspectRatio: false,
        plugins:{
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 1,
            }
          },
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            }
          }
        },
      },
    })
  })
</script>

<div class="container">
  <canvas id="myChart" width="400" height="400"></canvas>
</div>