<script lang='typescript'>
  const menu = [
    {label: 'Manual', handle:'manual'},
    {label: 'From File', handle:'file'},
    {label: 'API', handle:'api'},
  ]
  export let selected = menu[0].handle
</script>

<div class="box">
  <aside class="menu">
    <p class="menu-label">
      Add data from
    </p>
    <ul class="menu-list">
      {#each menu as entry}
        <li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a on:click={() => selected = entry.handle} class={selected === entry.handle ? 'is-active' : ''} >
            {entry.label}
          </a>
        </li>
      {/each}
    </ul>
  </aside>  
</div>