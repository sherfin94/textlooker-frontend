<script lang='typescript'>
  export let filter: any
  export let deselect:(index:number) => void

  const tokenTypeToDisplayConfigMapping = {
    'author': {icon: 'person', color: 'success',  label: 'author', description: ''},
    'tokens': {icon: 'segment', color: 'warning', label: 'word', description: ''},
    'PERSON': {icon: 'person', color: 'primary', label: 'person', description: ''},
    'NORP': {icon: 'corporate_fare', color: 'link', label: 'identity', description: ''},
    'FAC': {icon: 'corporate_fare', color: 'link', label: 'building', description: ''},
    'ORG': {icon: 'corporate_fare', color: 'info', label: 'organization', description: ''},
    'GPE': {icon: 'outlined_flag', color: 'link', label: 'geo-political entity', description: ''},
    'LOC': {icon: 'place', color: 'primary', label: 'location', description: ''},
    'PRODUCT': {icon: 'inventory_2', color: 'grey', label: 'product', description: ''},
    'EVENT': {icon: 'event', color: 'info', label: 'event', description: ''},
    'WORK_OF_ART': {icon: 'image', color: 'warning', label: 'work of art', description: ''},
    'LAW': {icon: 'policy', color: 'link', label: 'law', description: ''},
    'LANGUAGE': {icon: 'language', color: 'primary', label: 'language', description: ''},
    'DATE_TOKENS': {icon: 'date_range', color: 'info', label: 'date', description: ''},
    'TIME': {icon: 'query_builder', color: 'warning', label: 'time', description: ''},
    'PERCENT': {icon: 'money', color: 'link', label: 'percent', description: ''},
    'MONEY': {icon: 'attach_money', color: 'grey', label: 'money', description: ''},
    'QUANTITY': {icon: 'pin', color: 'primary', label: 'quantity', description: ''},
    'ORDINAL': {icon: 'looks_one', color: 'info', label: 'ordinal', description: ''},
    'CARDINAL': {icon: 'looks_one', color: 'link', label: 'cardinal', description: ''}
  }

  let filterBody: HTMLElement
  let displayScrollers: boolean = false

  const scrollSpeed = 20
  let scrollIntervalHandle: number
  export let scrollRight = (width:number) => {
    filterBody && filterBody.scrollBy(width, 0)
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

<article class="message is-grey mb-1 is-flex">
  <div class="message-header is-size-6">
    <p>Filters</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body is-white is-light">
    <div class="level">
      <span class="material-icons-outlined scrollIcon {displayScrollers ? '': 'hide'}" on:mouseenter={() => mouseEnterScrollButtonHandler('left')} on:mouseleave={() => mouseLeaveScrollButtonHandler('left')}>
        chevron_left
      </span>
      <div class="level-left" bind:this={filterBody}>
          {#each [...filter] as item, index}
            <div class="level-item">
              <span class="tags has-addons">
                <span class="tag is-info icon">
                  <span class="material-icons-outlined has-text-white">
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
      <span class="material-icons-outlined scrollIcon {displayScrollers ? '': 'hide'}" on:mouseenter={() => mouseEnterScrollButtonHandler('right')} on:mouseleave={() => mouseLeaveScrollButtonHandler('right')}>
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

  article.message {
    width: 96%;
    margin-top: 4px;
  }

  div.message-header {
    width: 80px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  div.message-body {
    padding: 17px 0 0 10px;
    height: 50px;
    width: 95%;
    overflow-x: hidden;
  }

  div.level-left {
    overflow-x: hidden;
    overflow-y: hidden;
    width: inherit;
    max-width: 85%;
  }

  span.tag.icon {
    padding: 3px;
  }

  span.material-icons-outlined {
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