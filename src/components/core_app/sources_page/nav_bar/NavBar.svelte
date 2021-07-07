<script lang='typescript'>
  import Logo from './Logo.svelte'
  import SupportModal from '../../../SupportModal.svelte'
  import api from '../../../../api'
  import { navigate } from 'svelte-navigator'

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
  <div class="navbar-brand navbar-item pl-0">
    
    <Logo />
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