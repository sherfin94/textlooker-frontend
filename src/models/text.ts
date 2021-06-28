import api from '../api'
import { 
  currentTextSet as textStore,
  textStatus as textStatusStore,
  currentSourceID as currentSourceIDStore,
  currentFilter as currentFilterStore,
  currentDateRange as currentDateRangeStore
} from '../store'
import { getSource } from './source'
import type { text, dateRange, filterItem, source, textSet } from '../interface'

let currentSource: source, currentFilter: filterItem[], currentDateRange: dateRange

currentSourceIDStore.subscribe(id => {
  currentSource = getSource(id)
})

currentFilterStore.subscribe(filter => {
  currentFilter = filter
})

currentDateRangeStore.subscribe(dateRange => {
  currentDateRange = dateRange
})

export let loadText = async (from: number) => {
  textStatusStore.update(_ => 'loading')

  let status: boolean, texts: text[], textSet: textSet, total: number
  [status, texts, total] = await api.getAnalyzedText(
    currentSource.id,
    '*',
    from,
    currentDateRange.available,
    currentDateRange.startDate, currentDateRange.startTime,
    currentDateRange.endDate, currentDateRange.endTime,
    currentFilter
  )

  if (status) {
    textSet.texts = texts
    textSet.total = total
    textStore.update(_ => textSet)
    textStatusStore.update(_ => 'available')
  } else {
    textStatusStore.update(_ => 'not available')
  }
}