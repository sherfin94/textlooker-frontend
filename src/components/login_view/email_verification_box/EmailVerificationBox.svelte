<script lang='typescript'>
  import api from "../../../api";
  
  let [token, disabled] = ['', true]

  import { user } from '../../../store'
  let email:string
  user.subscribe(user => {email = user.email})

  let handleInput = () => {
    disabled = token.length < 6
  }

  let handleSubmit = async () => {
    console.log(email, token)
    const status = await api.verify(email, token)
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