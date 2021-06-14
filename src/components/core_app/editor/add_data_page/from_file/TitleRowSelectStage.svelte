<script lang='typescript'>
  import Table from './Table.svelte'

  export let callback: any
  export let data:any
  export let titleRowPresent: boolean

</script>

<div>
  <div class="columns mb-6">
    <div class="column is-three-fifths is-flex is-align-items-center">
      <h4 class="is-size-4">Is the first row a title row{titleRowPresent ? 'as shown' : ''}?</h4><br />
    </div>
    <div class="column is-one-fifth is-flex is-align-items-center">
      <div class="field is-flex is-align-items-center">
        <div class="container">
          <input id="titleAvailable" type="checkbox" name="titleAvailable" class="switch is-rounded" bind:checked={titleRowPresent}>
          <label for="titleAvailable">{titleRowPresent ? 'Yes' : 'No'}</label>
        </div>
      </div>
    </div>
    <div class="column is-one-fifth">
      <button class="button is-info" on:click={callback}>Proceed</button>
    </div>
  </div>
  <Table data={data} giveIndex={() => {}} hide={[]} columnSelectable={false} titleRowPresent={titleRowPresent} />
</div>