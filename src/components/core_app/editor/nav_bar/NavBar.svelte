<script lang='typescript'>
  import Logo from './Logo.svelte'
  import { Link } from 'svelte-navigator'
  export let selectedMenuItem:string
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <Link to='//app'>
    <div class="navbar-brand navbar-item">
      <Logo />
    </div>
  </Link>

  <div class="navbar-menu">
    <div class="navbar-start">
      <Link to='../explore' class="navbar-item {selectedMenuItem === 'explore' ? 'active-menu-item' : 'has-text-black'}">
        <span>
          Explore data
        </span>
      </Link>

      <Link to='../add' class="navbar-item {selectedMenuItem === 'add' ? 'active-menu-item' : 'has-text-black'}">
        <span>
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

<style type='scss'>
  @import '../../../../sass/bulma.scss';

  :global(a.active-menu-item) {
    background-color: $light;
    color: $link;
    border-radius: 3px;
    
  }

  :global(a.active-menu-item:hover) {
    background-color: $light;
    color: $link;
    border-radius: 3px;
  }
</style>