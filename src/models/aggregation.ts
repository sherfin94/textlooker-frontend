import api from '../api'
import { 
  currentAggregation as currentAggregationStore,
  aggregationStatus as aggregationStatusStore,
  currentSourceID as currentSourceIDStore,
  currentFilter as currentFilterStore,
  currentDateRange as currentDateRangeStore
} from '../store'
import { getSource } from './source'
import type { aggregation, dateRange, filterItem, source } from '../interface'

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
export let loadAggregation = async () => {
  aggregationStatusStore.update(_ => 'loading')

  let status: boolean, aggregation: aggregation
  if (currentDateRange.available) {
    [status, aggregation] = await api.getAggregation(
      currentSource.id,
      '*',
      currentFilter,
      currentDateRange.startDate, currentDateRange.startTime,
      currentDateRange.endDate, currentDateRange.endTime)
  } else {
    [status, aggregation] = await api.getAggregation(
      currentSource.id,
      '*',
      currentFilter,
      currentDateRange.startDate, currentDateRange.startTime,
      currentDateRange.endDate, currentDateRange.endTime)
  }

  if (status) {
    aggregationStatusStore.update(_ => 'available')
    currentAggregationStore.update(_ => aggregation)
    aggregationStatusStore.update(_ => 'available')
  } else {
    aggregationStatusStore.update(_ => 'not available')
  }
}