import api from '../api'
import { sources as sourcesStore, sourcesStatus as sourcesStatusStore, currentSourceID as currentSourceIDStore } from '../store'
import type { source } from '../interface'

export let sources:source[]

sourcesStore.subscribe(sourcesData => {
  sources = sourcesData
})

export let fetchSources = async () => {
  sourcesStatusStore.update(_ => 'loading')
  let [status, sources] = await api.getSources()
  
  if (status) {
    sourcesStore.update(_ => sources)
    sourcesStatusStore.update(_ => 'available')
  }
  else {
    sourcesStatusStore.update(_ => 'not available')
    console.log('Unable to fetch sources')
  }
}

export let setCurrentSourceID = (id: number) => {
  currentSourceIDStore.update(_ => id)
}


export let getSource = (sourceID:number): source => 
  sources.find(source => source.id === sourceID)