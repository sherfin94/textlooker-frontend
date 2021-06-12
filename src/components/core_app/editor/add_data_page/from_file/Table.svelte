<script lang='typescript'>
  import { pluck } from "../../../../../util/array_operations";



  let titles: any[] = []
  let coreData: any[] = []
  export let data: any[]
  export let hide: number[]
  export let giveIndex: (index:number) => void
  export let columnSelectable:boolean
  export let titleRowPresent: boolean

  let handleClick = (index: number) => {
    giveIndex(index)
  }

  $: {
    console.log(titleRowPresent)
    if (titleRowPresent) {
      titles = data[0]
      coreData = data.slice(1, 6)
    } else {
      titles = []
      coreData = data.slice(0, 5)
    }
  }

</script>

<div class="container m-3">
  <div class="columns scroller">
    <table class="table is-striped is-size-7 {columnSelectable ? 'selectable':''}">
      {#if titles}
        <thead>
          <tr>
            {#each titles as title, index}
              {#if pluck(hide, 'index').includes(index)}
              <th class='not-selectable'>{title}</th>
              {:else}
                <th class='selectable' on:click={() => handleClick(index)}>{title}</th>
              {/if}
            {/each}
          </tr>
        </thead>
      {/if}
      <tbody>
        {#each coreData as row}
          <tr>
            {#each row as item, index}
            {#if pluck(hide, 'index').includes(index)}
              <td class='not-selectable'>{item}</td>
            {:else}
              <td class='selectable' on:click={() => handleClick(index)}>{item}</td>
            {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style type='scss'>
  div.scroller {
    max-height: 500px;
    overflow-x: auto;
  }

  table.table {
    overflow: hidden;
    font-family: monospace;

    td, th {
      position: relative;
      color: darkblue;
    }

    td {
      border: none;
    }
  }

  table.table.selectable {
    th.selectable:hover::after, td.selectable:hover::after {
      content: '';
      position: absolute;
      background-color: lightblue;
      left: 0;
      top: -5000px;
      height: 15000px;
      width: 100%;
      z-index: 10;
      opacity: 0.6;
      cursor: pointer;
    }

    th.not-selectable, td.not-selectable {
      opacity: 0.2;
    }
  }
</style>