<script lang='typescript'>
  import type { sourceListItem } from './interface'
  import Source from './Source.svelte'
  import Action from './Action.svelte'

  export let items:sourceListItem[]

  let Slice = (items:sourceListItem[]):sourceListItem[][] => {
    let slices:sourceListItem[][] = []
    for(let i = 0; i < items.length; i += 4) {
      const slice = items.slice(i, i + 4)
      while(slice.length !== 0 && slice.length < 4) slice.push({type: 'source', id: null, name: null})
      if (slice.length !== 0) slices.push(slice)
    }
    return slices
  }

</script>

<div class="container">
  {#each Slice(items) as slice}
  <div class="columns">
    {#each slice as item}
    <div class="column p-0">
        {#if item.type === 'source'}
          <Source source={item} />
        {:else if item.type === 'action'}
          <Action action={item} />
        {/if}
      </div>
    {/each}
  </div>
  {/each}
</div>
