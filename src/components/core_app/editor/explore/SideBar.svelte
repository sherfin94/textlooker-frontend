<script lang='typescript'>
  const menu = [
    {label: 'PERSON', handle:'PERSON'},
    {label: 'NORP', handle:'NORP'},
    {label: 'FAC', handle:'FAC'},
    {label: 'ORG', handle:'ORG'},
    {label: 'GPE', handle:'GPE'},
    {label: 'LOC', handle:'LOC'},
    {label: 'PRODUCT', handle:'PRODUCT'},
    {label: 'EVENT', handle:'EVENT'},
    {label: 'WORK_OF_ART', handle:'WORK_OF_ART'},
    {label: 'LAW', handle:'LAW'},
    {label: 'LANGUAGE', handle:'LANGUAGE'},
    {label: 'DATE', handle:'DATE'},
    {label: 'TIME', handle:'TIME'},
    {label: 'PERCENT', handle:'PERCENT'},
    {label: 'MONEY', handle:'MONEY'},
    {label: 'QUANTITY', handle:'QUANTITY'},
    {label: 'ORDINAL', handle:'ORDINAL'},
    {label: 'CARDINAL', handle:'CARDINAL'}
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