<script lang='typescript'>
  import Logo from './Logo.svelte'
  import SourcesPage from './sources_page/SourcesPage.svelte'
  import { Route } from 'svelte-navigator'
</script>

<div>
  <div class="container mt-3">
    <Logo />
    <Route path="/">
      <SourcesPage />
    </Route>
  </div>
</div>