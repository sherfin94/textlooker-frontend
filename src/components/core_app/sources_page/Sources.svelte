<script lang='typescript'>
  import type { source } from '../../../interface'

  export let sources:source[]

  let sourceSlices = (sources:source[]):source[][] => {
    let slices:source[][] = []
    for(let i = 0; i < sources.length; i += 4) {
      const slice = sources.slice(i, i + 4)
      while(slice.length !== 0 && slice.length < 4) slice.push({id: null, name: null})
      if (slice.length !== 0) slices.push(slice)
    }
    return slices
  }

</script>

<div class="container">
  {#each sourceSlices(sources) as slice}
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

<style lang='scss'>
  div.block {
    border-radius: 4px;
  }
  div.block:hover {
    background-color: aliceblue;
    cursor: pointer;
  }
</style>
