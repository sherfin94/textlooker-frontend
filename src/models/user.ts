import api from '../api'
import { user as userStore } from '../store'

export let user: {
  email: string;
  password: string;
  signedIn: boolean;
}

userStore.subscribe(userData => {
  user = {...userData}
})

export let setUserCredentials = (email:string, password:string) => {
  userStore.update(userData => ({...userData, ...{ email, password }}))
}

export let setUserSignedIn = (signedIn:boolean) => {
  userStore.update(userData => ({...userData, ...{signedIn}}))
}

export let signInUser = (email:string, password:string) => {
  setUserCredentials(email, password)
  setUserSignedIn(true)
}

let refresherHandle:number

export let startPeriodicRefresh = () => {
  refresherHandle = window.setInterval(async () => {
    api.refreshToken()
  }, 15 * 60 * 1000)
}

export let pausePeriodicRefresh = () => {
  window.clearInterval(refresherHandle)
}