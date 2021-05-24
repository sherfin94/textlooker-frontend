<script lang="typescript">
  import { Router, Route } from "svelte-navigator";
  import LoginView from "./components/login_view/LoginView.svelte"
</script>

<div>
  <Router primary={false}>
    <Route path="/login">
      <LoginView />
    </Route>
  </Router>
</div>

<style lang="scss" global>
  @import './sass/bulma.scss';
</style>