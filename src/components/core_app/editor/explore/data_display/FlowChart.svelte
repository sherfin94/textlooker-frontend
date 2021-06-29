<script lang='typescript'>
  import { onMount } from 'svelte'
  import type { countItem, filterItem } from '../../../../../interface'
  import generatePerDateData from './generate_per_date_data'
  import * as ChartJs from 'chart.js'
  import api from '../../../../../api'
  
  
  ChartJs.Chart.register.apply(
    null,
    Object.values(ChartJs).filter((chartClass => 'id' in chartClass)),
    )


  export let sourceID: number
  export let filter: filterItem[]

  export let dateRangeAvailable: boolean
  export let startDate: string
  export let startTime: string
  export let endDate: string
  export let endTime: string
  export let label: string

  export let data: countItem[]
  let chart: ChartJs.Chart
  let canvasContext: any
  let loading = true
  
  $: {
    if (chart) {
      chart.data = generatePerDateData(data)
      chart.update()
    }
  }
  
  export let selectedHandler: (item: string) => void
  
  let changeToCursor = false



  onMount(async () => {
    loading = true


    let status: boolean
    [status, data] = await api.getPerDateAggregation(sourceID, '', filter, startDate, startTime, endDate, endTime, label)

    loading = false

    canvasContext = document.getElementById('piChart').getContext('2d');
    canvasContext.height = 200;
    chart = new ChartJs.Chart(canvasContext, {
      type: 'line',
      data: generatePerDateData(data),
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