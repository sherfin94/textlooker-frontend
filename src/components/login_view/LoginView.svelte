<script lang='typescript'>
  import Logo from '../logo/Logo.svelte'
  import LoginBox from './login_box/LoginBox.svelte'
  import EmailVerificationBox from './email_verification_box/EmailVerificationBox.svelte'
  import Notifications from './Notifications.svelte'
  import { Route } from "svelte-navigator"
  import { navigate } from 'svelte-navigator'
</script>

<div>
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={() => navigate('/')}>
    <Logo />
  </a>
  <div class="columns is-flex is-justify-content-center">
    <div class="column is-one-quarter">
      <Notifications />
      <div class="container has-background-light root">
        <Route path='/verification'>
          <EmailVerificationBox />
        </Route>
        <Route path='/'>
          <LoginBox />
        </Route>
      </div>
    </div>
  </div>
</div>

<style lang='scss'>
  div.root {
    border-radius: 10px;
  }
</style>