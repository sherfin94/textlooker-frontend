<script lang='typescript'>
  import api from '../../../api';

  import { validateEmail, validatePassword } from './validations'
  import EmailField from './EmailField.svelte'
  import PasswordField from './PasswordField.svelte'
  import ButtonGroup from './ButtonGroup.svelte'

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
  <EmailField bind:email={email} handleChange={handleChange} />
  <PasswordField bind:password={password} handleChange={handleChange} />
  <ButtonGroup bind:disabled={disabled} handleSignup={handleSignup} />
</div>