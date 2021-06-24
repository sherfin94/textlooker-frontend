<script lang='typescript'>
  import { onMount } from "svelte"
  const menu = [
    {label: 'People', handle:'PERSON'},
    {label: 'Words', handle:'tokens'},
    {label: 'Identities', handle:'NORP'},
    {label: 'Buildings', handle:'FAC'},
    {label: 'Organizations', handle:'ORG'},
    {label: 'Political Entities', handle:'GPE'},
    {label: 'Locations', handle:'LOC'},
    {label: 'Products', handle:'PRODUCT'},
    {label: 'Events', handle:'EVENT'},
    {label: 'Works of art', handle:'WORK_OF_ART'},
    {label: 'Laws', handle:'LAW'},
    {label: 'Languages', handle:'LANGUAGE'},
    {label: 'Dates', handle:'DATE'},
    {label: 'Time', handle:'TIME'},
    {label: 'Percentage', handle:'PERCENT'},
    {label: 'Money', handle:'MONEY'},
    {label: 'Quantity', handle:'QUANTITY'},
    {label: 'Ordinal', handle:'ORDINAL'},
    {label: 'Cardinal', handle:'CARDINAL'}
  ]
  export let selected = menu[0].handle
  export let availableLabels: string[]

  let menuColumn:HTMLElement, scrollerColumn: HTMLElement
  let displayScroller = false

  onMount(() => {
    menuColumn.onwheel = (event: WheelEvent) => {
      menuColumn.scrollBy(0, event.deltaY/5)
      const maxScrollTop = menuColumn.scrollHeight - menuColumn.clientHeight
      const ratio = menuColumn.scrollTop/maxScrollTop
      scrollerColumn.style.paddingTop = `${ratio * 100}px`
    }
  })

  $: {
    availableLabels
    if (menuColumn && (menuColumn.clientHeight < menuColumn.scrollHeight)) {
      displayScroller = true
    } else displayScroller = false
  }
</script>

<div class="box">
  <aside class="menu">
    <p class="menu-label">
      Look for
    </p>
    <div class="columns">
      <div class="column is-four-fifths menu-column" bind:this={menuColumn}>
        <ul class="menu-list">
          {#each menu as entry}
            {#if availableLabels.includes(entry.handle)}
              <li>
                <!-- svelte-ignore a11y-missing-attribute -->
                <a on:click={() => selected = entry.handle} class={selected === entry.handle ? 'is-active' : ''} >
                  {entry.label}
                </a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
      <div class="column is-one-fifth scroller-column {displayScroller ? '':'is-invisible'}" bind:this={scrollerColumn}>
        <div class="scroller"></div>
      </div>
    </div>
  </aside>  
</div>

<style type='scss'>
  div.scroller {
    background-color: rebeccapurple;
    width: 1px;
    margin: 0;
    padding: 0;
    height: 10px;
  }

  div.menu-column {
    max-height: 150px;
    overflow-y: hidden;
    overflow-x: hidden;
    padding-right: 0;
  }

  div.scroller-column {
    padding-left: 0px;
    padding-right: 0px;
    margin-left: 20px;
    width: 1px;
    background-color: aliceblue;
    border-radius: 3px;
    padding-top: 0;
    height: 110px;
    margin-top: 20px;
  }
</style>