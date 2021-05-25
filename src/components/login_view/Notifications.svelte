<script lang='typescript'>
  import { loginViewIssues } from '../../store'

  let issues:string[] = []
  loginViewIssues.subscribe(loginViewIssues => {
    issues = loginViewIssues
  })
</script>

{#if issues.length > 0}
  {#each issues as issue}
    <div class="notification is-danger is-light is-size-7">
      {issue}
    </div>
  {/each}
{/if}