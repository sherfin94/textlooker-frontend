<script lang='typescript'>
  import { onMount } from "svelte"
  import menu from './menu'
  export let selected: string
  export let availableLabels: string[]
  export let changeHandler: any

  let menuColumn:HTMLElement, scrollerColumn: HTMLElement
  let displayScroller = false

  onMount(() => {
    menuColumn.onwheel = (event: WheelEvent) => {
      event.stopPropagation()
      event.preventDefault()
      menuColumn.scrollBy(0, event.deltaY/5)
      const maxScrollTop = menuColumn.scrollHeight - menuColumn.clientHeight
      const ratio = menuColumn.scrollTop/maxScrollTop
      scrollerColumn.style.paddingTop = `${ratio * 100}px`
    }

    if (menuColumn && (menuColumn.clientHeight < menuColumn.scrollHeight)) {
      displayScroller = true
    } else displayScroller = false
  })

  export let displayBarChart: any
  
  $: {
    if (!availableLabels.includes(selected)) {
      for(let menuIndex in menu) {
        const handle = menu[menuIndex].handle
        if(availableLabels.includes(handle)) {
          selected = handle
          break
        }
      }
    }

    displayScroller = availableLabels.length >= 4
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
                <a on:click={() => {selected = entry.handle; changeHandler()}} class={selected === entry.handle ? 'is-active' : ''} >
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