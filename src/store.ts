import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export let user = writable({email:'', password:'', jwt:'', signedIn: false})
export let loginViewIssues:Writable<string[]> = writable([])