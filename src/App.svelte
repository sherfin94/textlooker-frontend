
<script lang='typescript'>
  import type {text} from './interface'

  export let texts:text[] = []
  let searchText:string = ''
  let content:string = '', author:string = ''

  import { onMount } from 'svelte'
  import api from './api'

  onMount(async () => {
    let [loginStatus, token] = await api.login('sherfin94@gmail.com', 'hellohell1432!')
  })

  let search = async () => {
    let textStatus
    [textStatus, texts] = await api.getAnalyzedText(3, '*', [searchText], "May 19 13:00:00 +0530 IST 2021", "May 30 17:00:00 +0530 IST 2021", [], [])
    console.log(textStatus, texts)
  }

  let createText = async () => {
    let status:boolean = await api.createText(content, [author], "May 20 14:10:00 +0530 IST 2021", 3 )
  }

  let aggregate = async () => {
    let [status, aggregation] = await api.getPerDateAggregation(3, '*', [], "May 19 13:00:00 +0530 IST 2021", "May 30 17:00:00 +0530 IST 2021", [], [], 'shas')
    console.log(status, aggregation)
  }
</script>

<div>
  <input bind:value={searchText} on:change={search}/>
  {#each texts as { content, author, people, gpe, date }, i}
    <ul>
      <li>{content}</li>
      <li>{author[0]}</li>
      <li>{people[0]}</li>
      <li>{date}</li>
    </ul>
  {/each}
  <input bind:value={content}/>
  <input bind:value={author}/>
  <button on:click={aggregate}/>
</div>