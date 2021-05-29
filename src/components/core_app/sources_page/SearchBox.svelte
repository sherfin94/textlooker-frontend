<script lang='typescript'>
  export let searchText:string
</script>

<p class="control has-icons-left">
  <input class="input" type="text" placeholder="Search" bind:value={searchText}>
  <span class="icon is-left">
    <i class="fas fa-search" aria-hidden="true"></i>
  </span>
</p>

<style lang='scss'>
  input.searchBox {
    width: 40vw;
    height: 6vh;
  }
</style>