import type dayjs from "dayjs";

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
  authors:countItem[]
  people:countItem[]
  gpe:countItem[]
  tokens:countItem[]
  dates:countItem[]
}

export interface countItem {
  date?:string
  key:string
  count:number
  show?:boolean
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

export interface insight {
  id: number
  sourceID: number
  title: string
  filter: filterItem[]
  visualizeTextSet: string[]
  lookForHandle: string
  lastUpdated: string
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
  dateRangeAvailable: boolean
  visualizationType: string
  saved?: boolean
}

export interface notification {
  message: string
  type: string
}