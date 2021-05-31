<script lang='typescript'>
  import type { sourceListItem } from './interface'
  export let action:sourceListItem

  export let processAction

  let handleClick = () => {
    processAction(action.name)
  }

</script>

<div>
    <div class="block p-3" on:click={handleClick}>
      <span class="icon has-text-success">
        <i class="fas fa-plus"></i>
      </span>
      <span class="icon-text">
        { action.name }
      </span>
    </div>
</div>

<style lang='scss'>
  div.block {
    border-radius: 4px;
  }
  div.block:hover {
    background-color: rgb(241, 248, 245);
    cursor: pointer;
  }

  span.icon-text {
    position: relative;
  }
</style>