import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { insight as insightType } from '../interface'
import dayjs from 'dayjs'
import api from '../api'

const emptyInsight = {
  id: 0,
  sourceID: 0,
  title: 'Untitled insight',
  filter: [],
  visualizeTextSet: [],
  lookForHandle: '',
  lastUpdated: '',
  startDate: dayjs('1900-01-01', 'YYYY-MM-DD'),
  endDate: dayjs(),
  dateRangeAvailable: false,
  visualizationType: 'barchart',
  saved: false
}


export let insight:Writable<insightType> = writable(emptyInsight)

let currentInsight: insightType
insight.subscribe(insight => {
  currentInsight = {...insight}
})

export const modify = (key: string, newValue: any) => {
  insight.update(insight => Object.assign({}, insight, { [key]: newValue, saved: false }))
}

export const save = async (): Promise<boolean> => {
  const { 
    id, sourceID, title, filter, visualizationType,
    visualizeTextSet, lookForHandle, startDate,
    endDate, dateRangeAvailable 
  } = currentInsight

  
  const [status, returnedID] = await api.postInsight({ 
    id, sourceID, title, filter, visualizationType,
    visualizeTextSet, lookForHandle, startDate,
    endDate, dateRangeAvailable 
  })

  if (status)
    insight.update(insight => Object.assign({}, insight, { id: returnedID, saved: true }))
  
  return status
}

export const load = (insightToBeLoaded: insightType) => {
  insight.update(_ => {
    return Object.assign({}, insightToBeLoaded, { saved: true })
  })
}