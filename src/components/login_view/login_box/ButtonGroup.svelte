<script lang='typescript'>
  import { Link } from "svelte-navigator";
  export let disabled:boolean
  export let handleSignup:() => void
</script>

<div class="field is-flex is-justify-content-center mt-4">
  <div class="control">
    <button class="button is-link" disabled={disabled}>Login</button>
    <Link to='/login/verification'>
      <button class="button is-link has-background-primary" disabled={disabled} on:click={handleSignup}>Signup</button>
    </Link>
  </div>
</div>