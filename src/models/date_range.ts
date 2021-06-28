import type { dateRange } from '../interface'
import { currentDateRange as dateRangeStore } from '../store'

export let setCurrentDateRange = (dateRange: dateRange) => {
  dateRangeStore.update(_ => dateRange)
}