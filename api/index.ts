import axios from 'axios'
import process from 'process'

const server = axios.create({
  baseURL: process.env.TEXTLOOKER_BACKEND_URL,
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
})

let api = {
  signup: async (email:string, password:string):Promise<boolean> => 
    server.post('/user_registrations', { email, password })
      .then(response => response.status === 200)
      .catch(response => response.status === 401)
  ,

  verify: async (email:string, password:string, verificationToken:string):Promise<boolean> => 
    server.post('/users', { email, password, verification_token: verificationToken })
      .then(response => response.status === 200)
      .catch(response => response.status === 401)
  ,
 
  login: async (email:string, password:string):Promise<any|[boolean, string]> => 
    server.post('/login', { email, password })
      .then(response => [response.status === 200, response.data.token])
      .catch(error => [false, 'token not available'])
}

export default api