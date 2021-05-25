<script lang='typescript'>
  export let password:string
  export let handleChange:() => void
</script>

<div class="field">
  <p class="control has-icons-left">
    <input type="password" class="input" placeholder="Password" bind:value={password} on:input={handleChange}/>
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>