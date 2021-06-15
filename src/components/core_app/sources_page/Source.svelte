<script lang='typescript'>
  import type { source } from '../../../interface'
  import { Link } from 'svelte-navigator'
  export let source:source
</script>

<div>
  {#if source.id !== null}
    <Link to={`source/${source.id}/add`}>
      <div class="block p-3 has-text-black">
        <span class="icon has-text-info">
          <span class="material-icons">
            storage
            </span>
        </span>
        <span class="icon-text">
          {source.name}
        </span>
      </div>
    </Link>
  {/if}
</div>

<style lang='scss'>
  div.block {
    border-radius: 4px;
  }
  div.block:hover {
    background-color: aliceblue;
    cursor: pointer;
  }

  span.icon-text {
    position: relative;
    top: 1px;
  }
</style>