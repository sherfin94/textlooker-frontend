<script lang='typescript'>
  export let email:string
  export let handleChange:() => void
</script>

<div class="field">
  <p class="control has-icons-left has-icons-right">
    <input type="text" class="input" placeholder="E-mail ID" bind:value={email} on:input ={handleChange} />
    <span class="icon is-small is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <!-- <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span> -->
  </p>
</div>