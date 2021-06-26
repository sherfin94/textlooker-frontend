<script lang='typescript'>
  export let currentPage: number
  export let availablePages: number
  export let paginationHandler: (page:number) => void
</script>

<div class="container">
  <!-- svelte-ignore a11y-missing-attribute -->
  <nav class="pagination is-right is-small" role="navigation" aria-label="pagination">
    {#if currentPage > 1}
      <a class="pagination-previous" on:click={() => paginationHandler(currentPage-1)}>Previous</a>
    {/if}
    {#if currentPage < availablePages}
      <a class="pagination-next" on:click={() => paginationHandler(currentPage+1)}>Next page</a>
    {/if}
    <ul class="pagination-list">
      {#if availablePages > 3 && currentPage > 2}
        <li><a class="pagination-link" aria-label="Goto page 1" on:click={() => paginationHandler(1)}>1</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
      {/if}
      {#if availablePages > 1 && currentPage != 1}
        <li><a class="pagination-link" aria-label="Goto page 45" on:click={() => paginationHandler(currentPage-1)}>{currentPage-1}</a></li>
      {/if}
      <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page" on:click={() => paginationHandler(currentPage)}>{currentPage}</a></li>
      {#if availablePages > 1 && currentPage != availablePages}
        <li><a class="pagination-link" aria-label="Goto page 47" on:click={() => paginationHandler(currentPage+1)}>{currentPage+1}</a></li>
      {/if}
      {#if availablePages > 4 && currentPage < (availablePages-1)}
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page 86" on:click={() => paginationHandler(availablePages)}>{availablePages}</a></li>
      {/if}
    </ul>
  </nav>
</div>

<style type='scss'>
  div.container {
    margin-bottom: 10px;
  }
</style>