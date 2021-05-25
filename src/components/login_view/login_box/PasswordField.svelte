<script lang='typescript'>
  export let password:string
  export let handleChange:() => void
  export let handleLogin:() => void

  let handleKeypress = (keyboardEvent:KeyboardEvent) => {   
    if(keyboardEvent.key === 'Enter') {
      handleLogin()
    }
  }
</script>

<div class="field">
  <p class="control has-icons-left">
    <input 
      type="password"
      class="input"
      placeholder="Password"
      bind:value={password}
      on:input={handleChange}
      on:keypress={handleKeypress}
    />
    <span class="icon is-small is-left">
      <i class="fas fa-lock"></i>
    </span>
  </p>
</div>