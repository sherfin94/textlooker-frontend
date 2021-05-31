<script lang='typescript'>
  import { onMount } from 'svelte'
  import { fetchSources } from '../../../models/source'
  import { sources as sourceStore } from '../../../store'
  import SearchBox from './SearchBox.svelte'
  import Sources from './Sources.svelte'
  import type { source } from '../../../interface'
  import type { sourceListItem } from './interface'

  let searchText = ''
  let loading = false
  let sources:source[]
  let itemsToBeDisplayed:sourceListItem[] = []

  let generateItemsToBeDisplayed = (sources:source[]):sourceListItem[] => {
    const filteredSources:source[] = sources.filter(
      source => source.name.toLowerCase().includes(searchText.toLowerCase())
    )
    const listItems:sourceListItem[] = filteredSources.map(source => ({...source,  type:'source'}))

    return [...listItems, { type: 'action', name: 'Create new source', id:null }]
  }

  sourceStore.subscribe(sourceData => {
    sources = sourceData
  })

  onMount(async () => {
    loading = true
    await fetchSources()
    itemsToBeDisplayed = generateItemsToBeDisplayed(sources)
    loading = false
  })

  let handleChange = () => {
    itemsToBeDisplayed = generateItemsToBeDisplayed(sources)
  }

</script>

<section class="section px-3">
  <SearchBox bind:searchText={searchText} handleChange={handleChange}/>

  <div class="container mt-4">
    <progress class="progress is-large is-info {loading ? '':'is-invisible'}" max="100" />
  </div>

  <Sources items={itemsToBeDisplayed} />
</section>

