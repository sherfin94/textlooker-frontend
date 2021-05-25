import { writable } from 'svelte/store'

export let user = writable({email:'', password:'', jwt:'', signedIn: false})