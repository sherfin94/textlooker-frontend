<script lang='typescript'>
  import { onMount } from 'svelte'
  import type { countItem } from '../../../../../interface'
  import generateChartData from './generate_chart_data'
  import * as ChartJs from 'chart.js'
  
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
  
  let changeToCursor = false
  onMount(async () => {
    canvasContext = document.getElementById('piChart').getContext('2d');
    canvasContext.height = 200;
    chart = new ChartJs.Chart(canvasContext, {
      type: 'doughnut',
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
            display: true,
            position: 'right',
            fullSize: true,
            labels: {
              boxHeight: 25,
              boxWidth: 10,
              padding: 13,
            }
          },
          tooltip: {
            callbacks: {
              title: items => items.map(item => item.label.join(' ')),
              label: item => 'Number of occurences: ' + item.formattedValue,
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
            display: false,
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

<div class="container">
  <canvas id="piChart" width="400" height="400" class={changeToCursor ? 'change-to-cursor' : ''}></canvas>
</div>

<style type='scss'>
  canvas.change-to-cursor {
    cursor: pointer;
  }
</style>