<script lang="typescript">
  import { Route, useNavigate, Router } from "svelte-navigator"
  import LoginView from './components/login_view/LoginView.svelte'
  import CoreApp from './components/core_app/CoreApp.svelte'
  import api from './api/index'
  import { startPeriodicRefresh } from './models/user'
  import Home from './components/home/Home.svelte'

  
  let autoLogin = () => {
    const navigate = useNavigate()
  
    api.refreshToken().then(loggedIn => {
      if(loggedIn) {
        startPeriodicRefresh()
      }
    })
    return ''
  }

</script>

<div>
  <Router primary={false}>
    {
    autoLogin()
    }
    <Route path="/">
      <Home />
    </Route>
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