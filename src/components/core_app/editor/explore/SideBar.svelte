<script lang='typescript'>
  const menu = [
    {label: 'People', handle:'people'},
    {label: 'Organizations', handle:'gpe'},
    {label: 'Tokens', handle:'tokens'},
  ]
  export let selected = menu[2].handle
</script>

<div class="box">
  <aside class="menu">
    <p class="menu-label">
      Look for
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