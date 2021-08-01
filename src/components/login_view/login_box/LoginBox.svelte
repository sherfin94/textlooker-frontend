<script lang='typescript'>
  import api from '../../../api';

  import { validateEmail, validatePassword } from './validations'
  import EmailField from './EmailField.svelte'
  import PasswordField from './PasswordField.svelte'
  import ButtonGroup from './ButtonGroup.svelte'
  import { useNavigate } from "svelte-navigator"
  import { clearIssues, setIssues } from '../actions'
  import { setUserCredentials, signInUser } from '../../../models/user'

	const navigate = useNavigate();

  let [email, password, loading] = ['', '', false]
  let disabled:boolean = true

  let handleChange = () => {
    const emailValid:boolean = validateEmail(email)
    const [ passwordValid, passwordIssues ] = validatePassword(password)
    disabled = false
  }

  let handleSignup = async () => {
    clearIssues()
    loading = true
    const [status, errorMessage] = await api.signup(email, password)
    loading = false
    if(status) {
      setUserCredentials(email, password)
      navigate('/login/verification')
    } else if (errorMessage && errorMessage.includes('duplicate'))
        setIssues(["You've already signed up with that email, please sign in."])
      else if (errorMessage && errorMessage.includes("Key: 'UserRegistration.Email'"))
        setIssues(["Please enter a valid email ID"])
      else if (errorMessage && errorMessage.includes("Key: 'UserRegistration.Password'"))
        setIssues(["Please enter an 8 letter long password"])
        
  }

  let handleLogin = async () => {
    clearIssues()
    loading = true
    const status = await api.login(email, password)
    loading = false
    if(status) {
      signInUser(email, password)
      navigate('/app')
    } else
      setIssues(['Please check your email or password, contact support@textlooker.com if you feel there is an issue.'])
  }
</script>

<div class="login-box px-6 pt-6 pb-4">
  <EmailField bind:email={email} handleChange={handleChange} />
  <PasswordField bind:password={password} handleChange={handleChange} handleLogin={handleLogin}/>
  <ButtonGroup bind:disabled={disabled} handleSignup={handleSignup} handleLogin={handleLogin} />
  <progress class="progress is-small is-primary mt-2 {loading ? '':'is-invisible'}" max="100"></progress>
</div>