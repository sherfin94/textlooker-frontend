<script lang='typescript'>
  import { Route } from 'svelte-navigator'
  import NavBar from './nav_bar/NavBar.svelte'
  import AddDataPage from './add_data_page/AddDataPage.svelte'
  export let sourceID:number
</script>

<div>
  <Route path='/explore'>
    <NavBar selectedMenuItem='explore' />
    <section class="section px-0 pt-3">
      Explore
    </section>
  </Route>
  <Route path='/add'>
    <NavBar selectedMenuItem='add' />
    <AddDataPage sourceID={sourceID} />
  </Route>
</div>