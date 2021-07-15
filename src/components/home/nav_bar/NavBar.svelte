<script lang='typescript'>
  import Logo from './Logo.svelte'
  import { navigate } from 'svelte-navigator'

  const loginHandler = async () => {
    navigate('/login')
  }

</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand navbar-item">
    <Logo />
  </div>

  <div class="navbar-end is-hidden-mobile">
    <div class="navbar-item">
      <div class="buttons">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="button is-info is-light" on:click={loginHandler}>
          <strong>Log in</strong>
        </a>
      </div>
    </div>
  </div>
</nav>

<style type="scss">
  nav {
    background: inherit; 
  }
</style>