<script lang='typescript'>
  let [token, disabled] = ['', true]

  let handleInput = () => {
    disabled = token.length < 6
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
        <button class="button is-link" disabled={disabled}>Verify</button>
      </div>
    </div>
  </div>