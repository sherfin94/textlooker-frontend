<script lang="typescript">
  import { Router, Route } from "svelte-navigator";
  import LoginView from "./components/login_view/LoginView.svelte"
</script>

<div>
  <Router primary={false}>
    <Route path="/login/*">
      <LoginView />
    </Route>
    <Route path="/app">Hello World!</Route>
  </Router>
</div>

<style lang="scss" global>
  @import './sass/bulma.scss';
</style>