<script lang="typescript">
  import { Router, Route } from "svelte-navigator";
  import RouterGateway from "./components/router_gateway/RouterGateway.svelte"
</script>

<div>
  <Router primary={false}>
    <Route path="/*">
      <RouterGateway />
    </Route>
  </Router>
</div>

<style lang="scss" global>
  @import './sass/bulma.scss';
</style>