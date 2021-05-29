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
      while(slice.length !== 0 && slice.length < 4) slice.push({id: null, name: null})
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
      <div class="column p-0">
          {#if source.id !== null}
            <div class="block p-3">
              <span class="icon has-text-success">
                <i class="fas fa-database"></i>
              </span>
              {source.name}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    {/each}
  </div>
</section>

<style lang='scss'>
  div.block {
    border-radius: 4px;
  }
  div.block:hover {
    background-color: aliceblue;
    cursor: pointer;
  }
</style>
