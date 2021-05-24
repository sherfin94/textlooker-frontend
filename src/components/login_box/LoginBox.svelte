<script lang='typescript'>
  import api from '../../api';

  import { validateEmail, validatePassword } from './validations'
  import { Link } from "svelte-navigator";

  let [email, password] = ['', '']
  let disabled:boolean = true
  let passwordIssues:string[]

  let handleChange = () => {
    const emailValid:boolean = validateEmail(email)
    const [ passwordValid, passwordIssues ] = validatePassword(password)
    disabled = !emailValid || !passwordValid
  }

  let handleSignup = async () => {
    const status = await api.signup(email, password)

  }
</script>

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
        <Link to='/login/verification'>
          <button class="button is-link has-background-primary" disabled={disabled} on:click={handleSignup}>Signup</button>
        </Link>
      </div>
    </div>
  </div>