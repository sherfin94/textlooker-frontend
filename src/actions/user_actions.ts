import { user } from '../store'

export let setUserCredentials = (email:string, password:string) => {
  user.update(userData => ({...userData, ...{ email, password }}))
}

export let setUserSignedIn = (signedIn:boolean) => {
  user.update(userData => ({...userData, ...{signedIn}}))
}

export let signInUser = (email:string, password:string) => {
  setUserCredentials(email, password)
  setUserSignedIn(true)
}