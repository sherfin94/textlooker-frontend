import axios from 'axios'
import process from 'process'

const server = axios.create({
  baseURL: process.env.TEXTLOOKER_BACKEND_URL,
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
})

interface text {
  content:string,
  author:string[],
  date:string,
  source_id:number,
  analyzed:boolean,
  gpe:string[],
  people:string[],
  tokens:string[]
}

interface aggregation {
  authors:countItem[]
  people:countItem[]
  gpe:countItem[]
  tokens:countItem[]
  dates:countItem[]
}

interface countItem {
  date:string
  value:string
  count:number
}

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
      .then(response => [response.status === 200, response.data.token])
      .catch(_ => [false, 'token not available'])
  ,

  refreshToken: async ():Promise<[boolean,string]|any[]> =>
    server.get('/auth/refresh_token')
      .then(response => [response.status === 200, response.data.token])
      .catch(_ => [false, 'refresh not available'])
  ,

  createSource: async (name:string):Promise<boolean> => 
    server.post('/auth/sources', { name })
      .then(response => response.status === 200)
      .catch(_ => false)
  ,

  getSources: async ():Promise<[boolean,{id:number, name:string}[]]|any[]> =>
    server.get('auth/sources')
      .then(response => [response.status === 200, response.data.sources])
      .catch(_ => [false, 'refresh not available'])
  ,

  deleteSource: async (id:number):Promise<boolean> => 
    server.delete(`/auth/sources/${id}`)
      .then(response => response.status === 200)
      .catch(_ => false)
  ,

  createText: async (content:string, author:string, date:string, sourceID:string):Promise<boolean> => 
    server.post('/auth/text', { content, author, date, sourceID })
      .then(response => response.status === 200)
      .catch(_ => false)
  ,

  getText: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string):Promise<[boolean, text[]]|any[]> =>
    server.post('auth/text', { sourceID, content, author, startDate, endDate })
      .then(response => [
        response.status === 200, 
        response.data.texts
      ])
      .catch(_ => [false, "could not fetch texts"])
  ,

  getAnalyzedText: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string, people:string[], gpe:string[]):Promise<[boolean, text[]]|any[]> =>
  server.post('auth/analyzed_text', { sourceID, content, author, startDate, endDate, people, gpe })
    .then(response => [
      response.status === 200, 
      response.data.texts
    ])
    .catch(_ => [false, "could not fetch texts"])
  ,

  getAggregation: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string, people:string[], gpe:string[]):Promise<[boolean, aggregation]|any[]> =>
  server.post('auth/general_aggregation', { sourceID, content, author, startDate, endDate, people, gpe })
    .then(response => [
      response.status === 200, 
      response.data.aggregation
    ])
    .catch(_ => [false, "could not fetch aggregation"])
  ,

  getPerDateAggregation: async (sourceID:number, content:string, author: string[], startDate:string, endDate:string, people:string[], gpe:string[], field:string):Promise<[boolean, countItem[]]|any[]> =>
  server.post('auth/per_date_aggregation', { sourceID, content, author, startDate, endDate, people, gpe, field })
    .then(response => [
      response.status === 200, 
      response.data.aggregation
    ])
    .catch(_ => [false, "could not fetch per date aggregation"])
  ,
}


export default api