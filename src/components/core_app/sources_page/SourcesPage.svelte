<script lang='typescript'>
  import { onMount } from 'svelte'
  import type { source } from '../../../interface'
  import { fetchSources } from '../../../models/source'
  import SearchBox from './SearchBox.svelte'
  import { sources } from '../../../models/source'

  let searchText = ''
  let loading = false
  let sourceSlices:source[][] = []

  let createSourceSlices = ():source[][] => {
    let slices:source[][] = []
    for(let i = 0; i < sources.length; i += 4) {
      const slice = sources.slice(i, i + 4)
      if (slice.length !== 0) slices.push(slice)
    }
    return slices
  }

  onMount(async () => {
    loading = true
    await fetchSources()
    sourceSlices = createSourceSlices()
    loading = false
  })

</script>

<section class="section px-3">
  <SearchBox bind:searchText={searchText} />

  <div class="container mt-4">
    <progress class="progress is-large is-info {loading ? '':'is-invisible'}" max="100" />
  </div>

  <div class="container">
    {#each sourceSlices as slice}
    <div class="columns">
      {#each slice as source}
        <div class="column">
          <div class="block">
            {source.name}
          </div>
        </div>
      {/each}
    </div>
    {/each}
  </div>

  
</section>
