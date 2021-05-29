<script lang='typescript'>
  import { onMount } from 'svelte'
  import { fetchSources } from '../../../models/source'
  import { sources as sourceStore } from '../../../store'
  import SearchBox from './SearchBox.svelte'
  import Sources from './Sources.svelte'
  import type { source } from '../../../interface'

  let searchText = ''
  let loading = false
  let sources:source[]
  let sourcesToBeDisplayed:source[]

  sourceStore.subscribe(sourceData => {
    sources = sourceData
    sourcesToBeDisplayed = sources
  })

  onMount(async () => {
    loading = true
    await fetchSources()
    loading = false
  })

  let handleChange = () => {   
    sourcesToBeDisplayed = sources.filter(
      source => source.name.toLowerCase().includes(searchText.toLowerCase()))
  }

</script>

<section class="section px-3">
  <SearchBox bind:searchText={searchText} handleChange={handleChange}/>

  <div class="container mt-4">
    <progress class="progress is-large is-info {loading ? '':'is-invisible'}" max="100" />
  </div>

  <Sources bind:sources={sourcesToBeDisplayed} />
</section>

