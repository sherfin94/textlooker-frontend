<script lang="typescript">
  import { Route } from "svelte-navigator";
  import LoginView from "../../components/login_view/LoginView.svelte"
  import { useNavigate } from "svelte-navigator";
  import api from '../../api'
  import { startPeriodicRefresh } from "../../models/user";


    const navigate = useNavigate();

    api.refreshToken().then(loggedIn => {
      if(loggedIn) { 
        navigate('/app')
        startPeriodicRefresh()
      }
    })

</script>

<div>
    <Route path="/login/*">
      <LoginView />
    </Route>
    <Route path="/app">Hello World!</Route>
</div>

<style lang="scss" global>
  @import '../../sass/bulma.scss';
</style>