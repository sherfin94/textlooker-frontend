<script lang='typescript'>
  import { onMount } from 'svelte'
  import * as ChartJs from 'chart.js'
  import type { countItem } from '../../../../../interface'
  import generateChartData from './generate_chart_data'
  
  ChartJs.Chart.register.apply(
    null,
    Object.values(ChartJs).filter((chartClass => 'id' in chartClass)),
    )

  export let data: countItem[]
  let chart: ChartJs.Chart
  let canvasContext: any
  
  $: {
    if (chart) {
      chart.data = generateChartData(data)
      chart.update()
    }

  }
  
  export let selectedHandler: (item: string) => void
  export let canvasIndex: number
  
  let changeToCursor = false
  onMount(async () => {
    canvasContext = document.getElementById('myChart' + canvasIndex).getContext('2d');
    canvasContext.height = 200;
    chart = new ChartJs.Chart(canvasContext, {
      type: 'bar',
      data: generateChartData(data),
      options: {
        onClick: _ => {
            const index = chart.getActiveElements()[0].index
            const item = data[index].key
            selectedHandler(item)
        },
        onHover: function(e, el) {
          changeToCursor = el[0] ? true : false
        },
        maintainAspectRatio: false,
        plugins:{
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              title: items => items.map(item => item.label.split(',').join(' '))
            }
          }
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
            },
            ticks: {
              font: {
                size: 14,
                weight: 'bold',
              },
              maxRotation: 0,
              autoSkip: false
            }
          }
        },
      },
    })
  })
</script>

<div class="container px-3">
  <canvas id={"myChart" + canvasIndex} width="400" height="400" class={changeToCursor ? 'change-to-cursor' : ''}></canvas>
</div>

<style type='scss'>
  canvas.change-to-cursor {
    cursor: pointer;
  }
</style>