<script lang='typescript'>
  export let filter: any
  export let deselect:(index:number) => void

  const tokenTypeToDisplayConfigMapping = {
    'tokens': {icon: 'segment', color: 'warning'},
    'PERSON': {icon: 'person', color: 'primary'},
    'NORP': {icon: 'segment', color: 'link'},
    'FAC': {icon: 'segment', color: 'link'},
    'ORG': {icon: 'corporate_fare', color: 'info'},
    'GPE': {icon: 'segment', color: 'link'},
    'LOC': {icon: 'segment', color: 'link'},
    'PRODUCT': {icon: 'segment', color: 'link'},
    'EVENT': {icon: 'segment', color: 'link'},
    'WORK_OF_ART': {icon: 'segment', color: 'link'},
    'LAW': {icon: 'segment', color: 'link'},
    'LANGUAGE': {icon: 'segment', color: 'link'},
    'DATE': {icon: 'segment', color: 'link'},
    'TIME': {icon: 'segment', color: 'link'},
    'PERCENT': {icon: 'segment', color: 'link'},
    'MONEY': {icon: 'segment', color: 'link'},
    'QUANTITY': {icon: 'segment', color: 'link'},
    'ORDINAL': {icon: 'segment', color: 'link'},
    'CARDINAL': {icon: 'segment', color: 'link'}
  }

  let filterBody: HTMLElement
  let displayScrollers: boolean = false

  const scrollSpeed = 20
  let scrollIntervalHandle: number
  let scrollRight = (width:number) => {
    filterBody.scrollBy(width, 0)
  }

  let mouseEnterScrollButtonHandler = (direction: string) => {
    const sign = direction === 'right' ? 1 : -1
    scrollIntervalHandle = window.setInterval(() => scrollRight(scrollSpeed * sign), 50)
  }

  let mouseLeaveScrollButtonHandler = (direction: string) => {
    window.clearInterval(scrollIntervalHandle)
  }
  
  $: {
    filter
    if(filterBody) {
      displayScrollers = (filterBody.scrollWidth - filterBody.offsetWidth) > 0
    }
  }
</script>

<article class="message is-primary">
  <div class="message-header is-size-6">
    <p>Filters</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">
    <div class="level">
      <span class="material-icons scrollIcon {displayScrollers ? '': 'hide'}" on:mouseenter={() => mouseEnterScrollButtonHandler('left')} on:mouseleave={() => mouseLeaveScrollButtonHandler('left')}>
        chevron_left
      </span>
      <div class="level-left" bind:this={filterBody}>
          {#each [...filter] as item, index}
            <div class="level-item">
              <span class="tags has-addons">
                <span class="tag is-{tokenTypeToDisplayConfigMapping[item.label].color} icon">
                  <span class="material-icons has-text-white">
                    {tokenTypeToDisplayConfigMapping[item.label].icon}
                  </span>
                </span>
                <span class="tag is-{tokenTypeToDisplayConfigMapping[item.label].color} is-light is-size-7">
                  {item.text}
                  <button class="delete is-small" on:click={() => deselect(index)}></button>
                </span>
              </span>
            </div>
            {/each}
          <div class="level-item">
            <span class="tags has-addons">
              <span class="tag is-hidden icon">
                <span class="tag is-light is-size-7">
                  placeholder
                </span>
            </span>
          </div>
      </div>
      <span class="material-icons scrollIcon {displayScrollers ? '': 'hide'}" on:mouseenter={() => mouseEnterScrollButtonHandler('right')} on:mouseleave={() => mouseLeaveScrollButtonHandler('right')}>
        chevron_right
      </span>
    </div>
  </div>
</article>

<style type='scss'>
  .tag {
    height: 20px;
    margin:0 !important;
  }

  .tags:hover {
    height: 20px;
    button.delete {
      visibility: visible;
    }
  }

  .tags:not(:last-child), .tags:last-child {
    margin: 0;
  }

  button.delete {
    display:hidden;
    visibility: hidden;
    // margin-bottom: 1.2rem;
  }



  div.message-body {
    padding: 10px;
    height: 50px;
  }

  div.level-left {
    overflow-x: hidden;
    overflow-y: hidden;
    max-width: 85%;
  }

  span.tag.icon {
    padding: 3px;
  }

  span.material-icons {
    font-size: 15px;
    padding: 0;
  }

  span.scrollIcon {
    font-size: 20px;
  }

  span.scrollIcon.hide {
    display:none;
  }

  span.scrollIcon:hover {
    background-color: aliceblue;
    border-radius: 5px;
    cursor: pointer;
  }
</style>