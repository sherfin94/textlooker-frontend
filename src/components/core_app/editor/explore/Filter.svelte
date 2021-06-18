<script lang='typescript'>
  export let filter: any
  export let deselect:(item:string, key:string) => void

  const tokenTypeToDisplayConfigMapping = {
    'people': {icon: 'person', color: 'primary'},
    'gpe': {icon: 'corporate_fare', color: 'info'},
    'tokens': {icon: 'segment', color: 'warning'}
  }
</script>

<article class="message is-success">
  <div class="message-header is-size-6">
    <p>Filters</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">              
    <div class="level">
      <div class="level-left">
        {#each Object.keys(filter) as tokenType}
          {#each [...filter[tokenType]] as item}
            <div class="level-item">
              <span class="tags has-addons">
                <span class="tag is-{tokenTypeToDisplayConfigMapping[tokenType].color} icon">
                  <span class="material-icons has-text-white">
                    {tokenTypeToDisplayConfigMapping[tokenType].icon}
                  </span>
                </span>
                <span class="tag is-{tokenTypeToDisplayConfigMapping[tokenType].color} is-light is-size-7">
                  {item}
                  <button class="delete is-small" on:click={() => deselect(item, tokenType)}></button>
                </span>
              </span>
            </div>
          {/each}
        {/each}
      </div>
    </div>
  </div>
</article>

<style type='scss'>
  .tag {
    height: 25px;
  }

  .tags:hover {
    button.delete {
      visibility: visible;
    }
  }

  button.delete {
    display:hidden;
    visibility: hidden;
    margin-bottom: 1.2rem;
    margin-right: -0.9rem;
  }

  div.message-header {
    padding: 0px 0px 0px 10px;
  }

  div.message-body {
    padding: 10px;
  }

  span.tag.icon {
    padding: 3px;
  }

  span.material-icons {
    font-size: 15px;
    padding: 0;
  }
</style>