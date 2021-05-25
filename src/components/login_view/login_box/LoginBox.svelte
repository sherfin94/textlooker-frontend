<script lang='typescript'>
  import api from '../../../api';

  import { validateEmail, validatePassword } from './validations'
  import EmailField from './EmailField.svelte'
  import PasswordField from './PasswordField.svelte'
  import ButtonGroup from './ButtonGroup.svelte'
  import { user, loginViewIssues } from '../../../store'
  import { useNavigate } from "svelte-navigator";

	const navigate = useNavigate();

  let [email, password, loading] = ['', '', false]
  let disabled:boolean = true
  let passwordIssues:string[]

  let handleChange = () => {
    const emailValid:boolean = validateEmail(email)
    const [ passwordValid, passwordIssues ] = validatePassword(password)
    disabled = !emailValid || !passwordValid
  }

  let handleSignup = async () => {
    loading = true
    const status = await api.signup(email, password)
    loading = false
    if(status) {
      user.update(user => Object.assign({}, user, { email, password }))
      navigate('/login/verification')
    } else
      loginViewIssues.update(issues => ['Unable to create account. Please contact support.'])
  }
</script>

<div class="login-box px-6 pt-6 pb-4">
  <EmailField bind:email={email} handleChange={handleChange} />
  <PasswordField bind:password={password} handleChange={handleChange} />
  <ButtonGroup bind:disabled={disabled} handleSignup={handleSignup} />
  <progress class="progress is-small is-primary mt-2 {loading ? '':'is-invisible'}" max="100"></progress>
</div>