<script lang='typescript'>
  import Logo from './Logo.svelte'
  import { Link, navigate } from 'svelte-navigator'
  import api from '../../../../api'
  export let selectedMenuItem:string

  import SupportModal from '../../../SupportModal.svelte'

  const logoutHandler = async () => {
    await api.logout()
    navigate('/login')
  }

  let displayModal = false
  const supportButtonClickHandler = () => {
    displayModal = true
  }
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <Link to='//app'>
    <div class="navbar-brand navbar-item pl-0">
      <Logo />
    </div>
  </Link>

  <div class="navbar-menu">
    <div class="navbar-start">
      <Link to='../explore' class="navbar-item {selectedMenuItem === 'explore' ? 'active-menu-item' : 'has-text-black'}">
        <span>
          Editor
        </span>
      </Link>
      <Link to='../insights' class="navbar-item {selectedMenuItem === 'insights' ? 'active-menu-item' : 'has-text-black'}">
        <span>
          Insights
        </span>
      </Link>
      <Link to='../dashboards' class="navbar-item {selectedMenuItem === 'dashboards' ? 'active-menu-item' : 'has-text-black'}">
        <span>
          Dashboards
        </span>
      </Link>

      <Link to='../add' class="navbar-item {selectedMenuItem === 'add' ? 'active-menu-item' : 'has-text-black'}">
        <span>
          Add data
        </span>
      </Link>
    </div>

  </div>

  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="button is-info is-light" on:click={supportButtonClickHandler}>
          <strong>Support</strong>
        </a>
      </div>
    </div>
    <div class="navbar-item">
      <div class="buttons">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="button is-primary is-light" on:click={logoutHandler}>
          <strong>Log out</strong>
        </a>
      </div>
    </div>
  </div>
  <SupportModal bind:show={displayModal} />
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