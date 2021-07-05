<script lang='typescript'>
  export let show: boolean

  const handleClose = () => {
    show = false
  }
</script>

{#if show === true}
  <div class="modal is-active">
    <div class="modal-background" on:click={handleClose}></div>
    <div class="modal-content">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="title">Support email</div>
            <p>
              Kindly mail us at <a class='mail' href="mailto:support@textlooker.com">support@textlooker.com</a> and we'll respond within one business day.
            </p>
          </div>
          <div class="container mt-5">
            <div class="buttons">
              <button class="button is-info" on:click={handleClose}>Okay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={handleClose}></button>
  </div>
{/if}

<style type="scss">
  div.modal-content {
    width: 400px;
  }

  a.mail {
    font-weight: bold;
  }
</style>