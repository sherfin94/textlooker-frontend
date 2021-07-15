<script lang="typescript">
  import { Route, useNavigate, Router } from "svelte-navigator"
  import LoginView from './components/login_view/LoginView.svelte'
  import CoreApp from './components/core_app/CoreApp.svelte'
  import api from './api/index'
  import { startPeriodicRefresh } from './models/user'
  import Home from './components/home/Home.svelte'
  import Dashboard from './components/core_app/dashboard/Dashboard.svelte'

  
  let autoLogin = () => {
    const navigate = useNavigate()
  
    api.refreshToken().then(loggedIn => {
      if(loggedIn) {
        startPeriodicRefresh()
      } else {
        navigate('/login')
      }
    })
    return ''
  }

</script>

<div>
  <Router primary={false}>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/login/*">
      <LoginView />
    </Route>
    <Route path="/app/*">
      {
      autoLogin()
      }
      <CoreApp />
    </Route>
    <Route path="/dashboard/:dashboardID/:token" let:params>
      <Dashboard id={parseInt(params.dashboardID)} token={params.token} />
    </Route>
  </Router>
</div>

<style lang="scss" global>
  @import './sass/bulma.scss';
</style>