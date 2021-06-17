<script lang='typescript'>
  import { Route } from 'svelte-navigator'
  import NavBar from './nav_bar/NavBar.svelte'
  import AddDataPage from './add_data_page/AddDataPage.svelte'
  import Explore from './explore/Explore.svelte'

  export let sourceID:number
</script>

<div>
  <Route path='/explore'>
    <NavBar selectedMenuItem='explore' />
    <section class="section px-0 pt-3">
      <Explore sourceID={sourceID} />
    </section>
  </Route>
  <Route path='/add'>
    <NavBar selectedMenuItem='add' />
    <AddDataPage sourceID={sourceID} />
  </Route>
</div>