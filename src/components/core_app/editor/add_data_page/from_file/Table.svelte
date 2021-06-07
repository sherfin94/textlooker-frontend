<script lang='typescript'>
  export let data: any[]
  export let titles: any[]

  $: console.log(data)
</script>

<div class="container mt-3">
  <table class="table">
    {#if titles}
      <thead>
        <tr>
          {#each titles as title}
            <th>{title}</th>
          {/each}
        </tr>
      </thead>
    {/if}

    {#each data as row}
    <tr>
      {#each row as item}
        <td>{item}</td>
      {/each}
    </tr>
    {/each}
  </table>
</div>

<style type='scss'>
  div.container {
    max-height: 500px;
    overflow-x: scroll;
  }

  td {
    max-width: 200px;
  }
</style>