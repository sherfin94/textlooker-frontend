<script lang='typescript'>
  import Logo from './Logo.svelte'
  import { Link } from 'svelte-navigator'
  export let selectedMenuItem = 'explore'
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <Link to='//app'>
    <div class="navbar-brand navbar-item">
      <Logo />
    </div>
  </Link>

  <div class="navbar-menu">
    <div class="navbar-start">
      <Link to='../explore' class="navbar-item {selectedMenuItem === 'explore' ? 'has-background-light' : ''}">
        <span class="has-text-black">
          Explore data
        </span>
      </Link>

      <Link to='../add' class="navbar-item {selectedMenuItem === 'add' ? 'has-background-light' : ''}">
        <span class="has-text-black">
          Add data
        </span>
      </Link>
    </div>
  </div>

    <!-- <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div> -->
</nav>