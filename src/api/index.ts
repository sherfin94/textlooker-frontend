import axios, { AxiosInstance } from 'axios'
import type {text, aggregation, countItem, source} from '../interface'

let server:AxiosInstance

let configureServer = (authToken:string='') => {
  server = axios.create({
    baseURL: process.env.TEXTLOOKER_BACKEND_URL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}
  })
}

let scheduleAuthTokenRefresh = () => {
  setInterval(
    () => {
      api.refreshToken()
    },
    3600000 // ten seconds
  )
}

configureServer()

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
 
  login: async (email:string, password:string):Promise<[boolean, string]|any[]> => 
    server.post('/login', { email, password })
      .then(response => {
        const token = response.data.token
        configureServer(token)
        scheduleAuthTokenRefresh()
        return [response.status === 200, token]
      }).catch(_ => [false, 'token not available'])
  ,

  refreshToken: async ():Promise<[boolean,string]|any[]> =>
    server.get('/auth/refresh_token')
    .then(response => {
      const token = response.data.token
      configureServer(token)
      return [response.status === 200, token]
    }).catch(_ => [false, 'refresh not available'])
  ,

  createSource: async (name:string):Promise<boolean> => 
    server.post('/auth/sources', { name })
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

  createText: async (content:string, author:string[], date:string, sourceID:number):Promise<boolean> => 
    server.post('/auth/text', { content, author, date, sourceID })
      .then(response => response.status === 200)
      .catch(_ => false)
  ,

  getText: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string):Promise<[boolean, text[]]|any[]> =>
    server.get('auth/text', {params:{ sourceID, content, author, startDate, endDate }})
      .then(response => [
        response.status === 200, 
        response.data.texts
      ])
      .catch(_ => [false, "could not fetch texts"])
  ,

  getAnalyzedText: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string, people:string[], gpe:string[]):Promise<[boolean, text[]]|any[]> =>
  server.get('auth/analyzed_text', { params: { sourceID, content, author, startDate, endDate, people, gpe }})
    .then(response => [
      response.status === 200, 
      response.data.texts
    ])
    .catch(_ => [false, "could not fetch texts"])
  ,

  getAggregation: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string, people:string[], gpe:string[]):Promise<[boolean, aggregation]|any[]> =>
  server.get('auth/general_aggregation', { params: { sourceID, content, author, startDate, endDate, people, gpe }})
    .then(response => [
      response.status === 200, 
      response.data.aggregation
    ])
    .catch(_ => [false, "could not fetch aggregation"])
  ,

  getPerDateAggregation: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string, people:string[], gpe:string[], field:string):Promise<[boolean, countItem[]]|any[]> =>
  server.get('auth/per_date_aggregation', { params: { sourceID, content, author, startDate, endDate, people, gpe, field }})
    .then(response => [
      response.status === 200, 
      response.data.aggregation
    ])
    .catch(_ => [false, "could not fetch per date aggregation"])
  ,
}


export default api