import axios from 'axios'
import type {text, analyzedText, aggregation, countItem, source, filterItem, insight, dashboard} from '../interface'
import { toUnixTimestamp, toServerDateFormat } from '../util/date'

let server = axios.create({
  baseURL: process.env.TEXTLOOKER_BACKEND_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json', "Accept": "*/*"},
  withCredentials: true,
})

let api = {
  signup: async (email:string, password:string):Promise<boolean> => 
    server.post('/user_registrations', { email, password })
      .then(response => response.status === 200)
      .catch(_ => false)
  ,

  verify: async (email:string, verificationToken:string):Promise<boolean> => 
    server.post('/users', { email, verificationToken: verificationToken })
      .then(response => response.status === 200)
      .catch(_ => false)
  ,
 
  login: async (email:string, password:string):Promise<boolean> => 
    server.post('/login', { email, password })
      .then(response => {
        return response.status === 200
      }).catch(_ => false)
  ,

  logout: async ():Promise<boolean> => 
    server.get('/logout')
      .then(response => {
        return response.status === 200
      }).catch(_ => false)
  ,

  refreshToken: async ():Promise<boolean> =>
    server.get('/auth/refresh_token')
    .then(response => {
      return response.status === 200
    }).catch(_ => false)
  ,

  createSource: async (name:string, authorAvailable:boolean, dateAvailable:boolean):Promise<boolean> => 
    server.post('/auth/sources', { name, authorAvailable, dateAvailable })
      .then(response => response.status === 200)
      .catch(_ => false)
  ,

  getSources: async ():Promise<[boolean,source[]]|any[]> =>
    server.get('auth/sources')
      .then(response => [response.status === 200, response.data.sources])
      .catch(_ => [false, 'refresh not available'])
  ,

  deleteSource: async (id:number):Promise<boolean> => 
    server.delete(`/auth/sources/${id}`)
      .then(response => response.status === 200)
      .catch(_ => false)
  ,

  createText: async (textSet: text[], sourceID: number):Promise<[boolean, string]|any[]> => {
    let batch = {
      batch: textSet.map(text => ({
        content: text.content,
        ...(text.author ? {author: text.author} : {}),
        ...(text.date ? {date: toUnixTimestamp(text.date, text.time)} : {}),
      })),
      sourceID: sourceID
    }

    return server.post('/auth/text', batch)
      .then(response => [response.status === 200, response.data.savedTextCount])
      .catch(_ => [false, ''])
  },

  getText: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string):Promise<[boolean, analyzedText[]]|any[]> =>
    server.get('auth/text', {params:{ sourceID, content, author, startDate, endDate }})
      .then(response => [
        response.status === 200, 
        response.data.texts
      ])
      .catch(_ => [false, "could not fetch texts"])
  ,

  getAnalyzedText: async (sourceID:number, content:string, from:number, dateRangeAvailable: boolean, startDate:string, startTime:string, endDate:string, endTime:string, filter: filterItem[]):Promise<[boolean, analyzedText[]]|any[]> => {
    let params: any
  
    if (dateRangeAvailable) {
      startDate = toServerDateFormat(startDate, startTime)
      endDate = toServerDateFormat(endDate, endTime)
      params = { sourceID, content, filter, from, startDate, endDate }
    } else {
      params = { sourceID, content, filter, from }
    }

    return server.get('auth/analyzed_text', { params })
      .then(response => [
        response.status === 200,
        response.data.total,
        response.data.totalCountQualification,
        response.data.texts,
      ])
      .catch(_ => [false, 0, "could not fetch", "could not fetch texts"])
    }
  ,

  getAggregation: async (sourceID:number, content:string, filter: filterItem[], startDate:string, startTime:string, endDate:string, endTime:string):Promise<[boolean, aggregation]|any[]> => {
    startDate = toServerDateFormat(startDate, startTime)
    endDate = toServerDateFormat(endDate, endTime)
    return server.get('auth/general_aggregation', { params: { sourceID, content, filter, startDate, endDate }})
      .then(response => [
        response.status === 200, 
        response.data.aggregation
      ])
      .catch(_ => [false, "could not fetch aggregation"])
  }
  ,

  getPerDateAggregation: async (sourceID:number, content:string, filter: filterItem[], startDate:string, startTime:string, endDate:string, endTime:string, field:string):Promise<[boolean, countItem[]]|any[]> => {

    startDate = toServerDateFormat(startDate, startTime)
    endDate = toServerDateFormat(endDate, endTime)
    return  server.get('auth/per_date_aggregation', { params: { sourceID, content, filter, startDate, endDate, field }})
      .then(response => [
        response.status === 200, 
        response.data.aggregation
      ])
      .catch(_ => [false, "could not fetch per date aggregation"])
  }
  ,

  getDatelessAggregation: async (sourceID:number, content:string, filter: filterItem[]):Promise<[boolean, aggregation]|any[]> =>
  server.get('auth/dateless_aggregation', { params: { sourceID, content, filter }})
    .then(response => [
      response.status === 200, 
      response.data.aggregation
    ])
    .catch(_ => [false, "could not fetch aggregation"])
  ,

  postInsight: async (sourceID: number, title: string, filterItems: filterItem[], visualizeTextSet: string[], visualizationType: string, lookForHandle: string, dateRangeAvailable: boolean, startDate: string, startTime: string, endDate: string, endTime: string, description: string): Promise<boolean|any> => {
    const filter = JSON.stringify({filter: filterItems})
    const visualizeTexts = JSON.stringify({visualizeTexts: visualizeTextSet})
    startDate = toServerDateFormat(startDate, startTime)
    endDate = toServerDateFormat(endDate, endTime)

    return server.post('auth/insights', { sourceID, title, filter, visualizeTexts, lookForHandle, dateRangeAvailable, startDate, endDate, visualizationType, description })
      .then(response => response.status === 200)
      .catch(_ => false)
  },

  getInsights: async (sourceID: number): Promise<[boolean, insight[]]|any> => {
    return server.get('auth/insights', { params: { sourceID } })
      .then(response => {
        return [true, response.data.insights.map(item => { 
          return {
            title: item.title,
            filter: JSON.parse(item.filter)['filter'],
            visualizeTexts: JSON.parse(item.visualizeTexts)['visualizeTexts'],
            lookForHandle: item.lookForHandle,
            lastUpdated: item.last_updated,
            id: item.id,
            startDate: item.startDate,
            endDate: item.endDate,
            dateRangeAvailable: item.dateRangeAvailable,
            visualizationType: item.visualizationType
          }
        })]
      })
      .catch(_ => [false, []])
  },

  deleteInsight: async (sourceID: number, insightID: number): Promise<boolean|any> => {
    return server.delete('auth/insights', { params: { sourceID, insightID }})
      .then(response => response.status === 200)
      .catch(_ => false)
  },

  postDashboard: async (sourceID: number, title: string): Promise<boolean|any> => {
    return server.post('auth/dashboards', { sourceID, title })
      .then(response => response.status === 200)
      .catch(_ => false)
  },

  getDashboards: async (sourceID: number): Promise<[boolean, insight[]]|any> => {
    return server.get('auth/dashboards', { params: { sourceID } })
      .then(response => {
        return [true, response.data.dashboards.map(item => { 
          return {
            title: item.title,
            id: item.id,
            token: item.token,
            lastUpdated: item.last_updated
          }
        })]
      })
      .catch(_ => [false, []])
  },

  deleteDashboard: async (sourceID: number, dashboardID: number): Promise<boolean|any> => {
    return server.delete('auth/dashboards', { params: { sourceID, dashboardID }})
      .then(response => response.status === 200)
      .catch(_ => false)
  },

  addinsightToDashboard: async (sourceID: number, dashboardID: number, insightID): Promise<boolean|any> => {
    return server.post('auth/dashboard_insights', { sourceID, dashboardID, insightID })
      .then(response => response.status === 200)
      .catch(_ => false)
  },

  getDashboardViaToken: async (dashboardID: number, token: string): Promise<[boolean, dashboard]|any> => {
    return server.get('dashboards', { params: { dashboardID, token } })
      .then(response => {
        const dashboard = response.data.dashboard
        return [true, {
          id: dashboard.id,
          title: dashboard.title,
          insightIDs:[...new Set(dashboard.insightIDs)],
        }]})
      .catch(_ => [false, []])
  },

  getInsightsAggregationViaToken : async (dashboardID: number, insightID: number, token: string): Promise<[boolean, any]|any> => {
    return server.get('dashboard_insights', { params: { dashboardID, insightID, token } })
      .then(response => {
        return [true, response.data.aggregation]
      })
      .catch(_ => [false, []])
  },
}


export default api