import { user as userStore } from '../store'

export let user: {
  email: string;
  password: string;
  signedIn: boolean;
}

userStore.subscribe(userData => {
  user = {...userData}
})