<script lang='typescript'>
import { navigate } from "svelte-navigator";

  import api from "../../../api";
  
  let [token, disabled, loading] = ['', true, false]

  import { user, signInUser } from '../../../models/user'
  import { setIssues } from "../actions";

  let handleInput = () => {
    disabled = token.length < 6
  }

  let handleSubmit = async () => {
    loading = true
    const status = await api.verify(user.email, token)
    if(status) {
      const loggedIn = await api.login(user.email, user.password)
      if(loggedIn) {
        signInUser(user.email, user.password)
        navigate('/app')
      } else {
        setIssues(["Token verified, but unable to login. Please try logging in using the email and password you have set."])
      }
    } else {
      setIssues(["Could not verify token, please check your token."])
    }
  }
</script>

  <div class="p-6">
    <div class="field">
      <p class="control">
        <input type="text" class="input" placeholder="Verification token" bind:value={token} on:input={handleInput}/>
      </p>
    </div>
    <div class="field is-flex is-justify-content-center mt-4">
      <div class="control">
        <button class="button is-link" disabled={disabled} on:click={handleSubmit}>Verify</button>
      </div>
    </div>
  </div>