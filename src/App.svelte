<script lang="typescript">
  import { Router, Route } from "svelte-navigator";
  import LoginView from './components/login_view/LoginView.svelte'
  import CoreApp from './components/core_app/CoreApp.svelte'
</script>

<div>
  <Router primary={false}>
    <Route path="/login/*">
      <LoginView />
    </Route>
    <Route path="/app/*">
      <CoreApp />
    </Route>
  </Router>
</div>

<style lang="scss" global>
  @import './sass/bulma.scss';
</style>