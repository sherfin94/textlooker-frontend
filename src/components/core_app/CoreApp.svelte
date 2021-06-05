<script lang='typescript'>
  import SourcesPage from './sources_page/SourcesPage.svelte'
  import Editor from './editor/Editor.svelte'
  import { Route } from 'svelte-navigator'
</script>

<div>
  <div class="container mt-3">
    <Route path="/">
      <SourcesPage />
    </Route>
    <Route path="source/:sourceID/*" let:params>
      <Editor sourceID={parseInt(params.sourceID)}/>
    </Route>
  </div>
</div>