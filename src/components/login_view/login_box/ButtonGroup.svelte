<script lang='typescript'>
  export let disabled:boolean
  export let handleSignup:() => void
</script>

<div class="field is-flex is-justify-content-center mt-4">
  <div class="control">
    <button class="button is-link" disabled={disabled}>Login</button>
      <button class="button is-link has-background-primary" disabled={disabled} on:click={handleSignup}>Signup</button>
  </div>
</div>