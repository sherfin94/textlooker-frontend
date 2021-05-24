<script lang='typescript'>
  import Logo from '../logo/Logo.svelte'
  import LoginBox from '../login_box/LoginBox.svelte'
  import EmailVerificationBox from './email_verification_box/EmailVerificationBox.svelte'
  import { Route } from "svelte-navigator"
</script>

<div>
  <Logo />
  <div class="columns is-flex is-justify-content-center">
    <div class="column is-one-quarter">
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