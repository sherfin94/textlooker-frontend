<script lang='typescript'>
  import { onMount } from "svelte";

  export let searchText:string
  export let handleChange
  let inputBox

  onMount(async () => {
    inputBox.focus()
  })
</script>

<p class="control has-icons-left">
  <input bind:this={inputBox} class="input" type="text" placeholder="Search" bind:value={searchText} on:input={handleChange} />
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