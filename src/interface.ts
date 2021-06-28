export interface text {
  content:string
  author?:string[]|any
  date?:string|any
  time?: string|any
}

export interface analyzedText {
  content:string
  author:string[]
  date:string
  source_id:number
  analyzed:boolean
  gpe:string[]
  people:string[]
  tokens:string[]
}

export interface aggregation {
  CARDINAL: countItem[]
  DATE_TOKENS: countItem[]
  EVENT: countItem[]
  FAC: countItem[]
  GPE: countItem[]
  LANGUAGE: countItem[]
  LAW: countItem[]
  LOC: countItem[]
  MONEY: countItem[]
  NORP: countItem[]
  ORDINAL: countItem[]
  ORG: countItem[]
  PERCENT: countItem[]
  PERSON: countItem[]
  PRODUCT: countItem[]
  QUANTITY: countItem[]
  TIME: countItem[]
  WORK_OF_ART: countItem[]
  tokens: countItem[]
}

export interface countItem {
  date?:string
  key:string
  count:number
}

export interface source {
  id:number
  name:string
  authorAvailable: boolean
  dateAvailable: boolean
  token: string
}

export interface filterItem {
  label: string
  text: string
}

export interface dateRange {
  available: boolean
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export interface textSet {
  texts: text[]
  total: number
}