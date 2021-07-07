<script lang='typescript'>
  export let disabled:boolean
  export let handleSignup:() => void
  export let handleLogin:() => void
</script>

<div class="field is-flex is-justify-content-center mt-4">
  <div class="control">
    <button class="button is-link has-text-weight-bold" disabled={disabled} on:click={handleLogin}>Login</button>
    <button class="button is-link has-background-primary has-text-weight-bold" disabled={disabled} on:click={handleSignup}>Signup</button>
  </div>
</div>