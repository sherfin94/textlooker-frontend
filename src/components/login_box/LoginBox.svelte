<script lang='typescript'>
  import { validateEmail, validatePassword } from './validations'

  let [email, password] = ['', '']
  let disabled:boolean = true
  let passwordIssues:string[]

  let handleChange = () => {
    const emailValid:boolean = validateEmail(email)
    const [ passwordValid, passwordIssues ] = validatePassword(password)
    disabled = !emailValid || !passwordValid
  }
</script>

<div class="container has-background-light root">
  <div class="login-box p-6">
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
    <div class="field">
      <p class="control has-icons-left">
        <input type="password" class="input" placeholder="Password" bind:value={password} on:input={handleChange}/>
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field is-flex is-justify-content-center mt-4">
      <div class="control">
        <button class="button is-link" disabled={disabled}>Login</button>
        <button class="button is-link has-background-primary" disabled={disabled}>Signup</button>
      </div>
    </div>
  </div>
</div>

<style lang='scss'>
  div.root {
    border-radius: 10px;
  }
</style>