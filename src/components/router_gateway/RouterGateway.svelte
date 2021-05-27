<script lang="typescript">
  import { Route } from "svelte-navigator";
  import LoginView from "../../components/login_view/LoginView.svelte"
  import { useNavigate } from "svelte-navigator";
  import api from '../../api'


    const navigate = useNavigate();

    api.refreshToken().then(loggedIn => {
      loggedIn && navigate('/app')
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