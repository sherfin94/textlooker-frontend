import axios from 'axios'
import process from 'process'
import Source from './source'

const server = axios.create({
  baseURL: process.env.TEXTLOOKER_BACKEND_URL,
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
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

  getSources: async ():Promise<[boolean,Source[]]|any[]> =>
    server.get('auth/sources')
      .then(response => [
        response.status === 200,
        response.data.sources.map(
          (source: {id:number, name:string}) => new Source(source.id, source.name))
      ])
      .catch(_ => [false, 'refresh not available'])
  ,
}


export default api