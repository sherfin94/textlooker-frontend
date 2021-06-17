import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { source } from './interface'

export let user = writable({email:'', password:'', signedIn: false})
export let sources:Writable<source[]> = writable([])
export let loginViewIssues:Writable<string[]> = writable([])