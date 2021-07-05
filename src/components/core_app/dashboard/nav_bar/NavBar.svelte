<script lang='typescript'>
  import Logo from './Logo.svelte'

</script>

<nav class="navbar pb-0" role="navigation" aria-label="main navigation">
  <div class="navbar-brand navbar-item pl-0">
    <Logo />
  </div>
</nav>

<style type='scss'>
  nav.navbar {
    height: 50px;
    flex-direction: column;
    align-items: center;
  }
</style>