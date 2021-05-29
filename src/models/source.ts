import api from '../api'
import { sources as sourcesStore } from '../store'
import type { source } from '../interface'

export let sources:source[]

sourcesStore.subscribe(sourcesData => {
  sources = sourcesData
})

export let fetchSources = async () => {
  let [status, sources] = await api.getSources()
  if (status)
    sourcesStore.update(_ => sources)
  else {
    console.log('Unable to fetch sources')
    
  }
}