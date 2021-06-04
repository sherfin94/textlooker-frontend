<script lang='typescript'>
  import { Route } from 'svelte-navigator'
  import NavBar from './nav_bar/NavBar.svelte'
  export let sourceID:string
</script>

<div>
  <Route path='/explore'>
      <NavBar selectedMenuItem='explore' />
      Explore
    </Route>
    <Route path='/add'>
      <NavBar selectedMenuItem='add' />
      Add
    </Route>
</div>