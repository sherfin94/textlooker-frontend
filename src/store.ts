import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { aggregation, filterItem, source, dateRange, textSet } from './interface'

export let user = writable({email:'', password:'', signedIn: false})


export let sources:Writable<source[]> = writable([])
export let sourcesStatus:Writable<string> = writable('not available')
export let currentSourceID:Writable<number> = writable(0)

export let loginViewIssues:Writable<string[]> = writable([])

export let currentFilter:Writable<filterItem[]> = writable([])


let emptyAggregation = {
  CARDINAL: [],
  DATE_TOKENS: [],
  EVENT: [],
  FAC: [],
  GPE: [],
  LANGUAGE: [],
  LAW: [],
  LOC: [],
  MONEY: [],
  NORP: [],
  ORDINAL: [],
  ORG: [],
  PERCENT: [],
  PERSON: [],
  PRODUCT: [],
  QUANTITY: [],
  TIME: [],
  WORK_OF_ART: [],
  tokens: []
}

export let currentAggregation:Writable<aggregation> = writable<aggregation>(emptyAggregation)
export let aggregationStatus:Writable<string> = writable<string>('not available')

export let currentTextSet:Writable<textSet> = writable<textSet>({texts: [], total: 0})
export let textStatus:Writable<string> = writable<string>('not available')

const emptyDateRange: dateRange = {
  available: false,
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: ''
}
export let currentDateRange:Writable<dateRange> = writable<dateRange>(emptyDateRange)

export let selectedSideBarItem:Writable<string> = writable<string>('')

export let selectedVisualization:Writable<string> = writable<string>('')