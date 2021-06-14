<script lang='typescript'>
  import SideBar from './SideBar.svelte'
  import ManualDataEntry from './ManualDataEntry.svelte'
  import FromFileDataEntry from './from_file/FromFileDataEntry.svelte'
  import ApiDataEntry from './ApiDataEntry.svelte'

  let selectedMenuItem:string
  export let sourceID:number
</script>

<section class="section px-0 pt-3">
  <div class="container">
    <div class="columns">
      <div class="column is-one-fifth">
        <SideBar bind:selected={selectedMenuItem} />
      </div>
      <div class="column is-four-fifths">
        <div class="box">
          {#if selectedMenuItem === 'manual'}
            <ManualDataEntry sourceID={sourceID}/>
          {:else if selectedMenuItem === 'file'}
            <FromFileDataEntry sourceID={sourceID} />
          {:else if selectedMenuItem === 'api'}
            <ApiDataEntry sourceID={sourceID} />
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>