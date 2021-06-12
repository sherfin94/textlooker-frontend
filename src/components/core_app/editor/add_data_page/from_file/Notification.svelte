<script lang='typescript'>
  export let message:string
  export let close: () => void
  export let actionHandler: () => void
  export let show:boolean
</script>

<div class="modal {show ? 'is-active' : ''}">
  <div class="modal-background"></div>
  <div class="modal-content">
    <article class="message is-info">
      <div class="message-header">
        <p>Warning</p>
      </div>
      <div class="message-body">
        {message}
      </div>
      <div class="container is-flex is-justify-content-center pb-3">
        <div class="buttons">
          <button class="button is-primary is-light" on:click={close}>Modify format</button>
          <button class="button is-primary" on:click={actionHandler}>Upload data</button>
        </div>
      </div>
    </article>
  </div>
</div>