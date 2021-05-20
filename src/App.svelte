
<script lang='typescript'>
  import type {text, source} from './interface'
  export let sources:source[] = []
  export let texts:text[] = []

  import { onMount } from 'svelte'
  import api from './api'

  onMount(async () => {
    let [status, token] = await api.login('sherfin94@gmail.com', 'hellohell1432!')
    console.log(status, token)
  })
</script>

<div>
  sources: {sources}
  {#each texts as { content, author, people, gpe, date }, i}
    <ul>
      <li>{content}</li>
      <li>{author[0]}</li>
      <li>{people[0]}</li>
      <li>{gpe[0]}</li>
      <li>{date}</li>
    </ul>
  {/each}
</div>