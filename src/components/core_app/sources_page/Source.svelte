<script lang='typescript'>
  import type { source } from '../../../interface'
  export let source:source
</script>

<div>
  {#if source.id !== null}
    <div class="block p-3">
      <span class="icon has-text-success">
        <i class="fas fa-database"></i>
      </span>
      {source.name}
    </div>
  {/if}
</div>