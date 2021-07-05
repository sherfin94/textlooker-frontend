<script lang='typescript'>
  import SourcesPage from './sources_page/SourcesPage.svelte'
  import Editor from './editor/Editor.svelte'
  import Dashboard from './dashboard/Dashboard.svelte'
  import { Route } from 'svelte-navigator'
  import { notifications as notificationStore } from '../../store'
  import { onMount } from 'svelte'
  import type { notification } from '../../interface'

  let notifications: notification[] = []
  let notificationsContainer: HTMLElement
  let notificationTimeoutHandle: any

  onMount(() => {
    notificationStore.subscribe(storedNotifications => {
      if (storedNotifications.length > 0) {
        notifications = [(storedNotifications[storedNotifications.length - 1])]
        notificationsContainer.style.zIndex = '100'

        if (notificationTimeoutHandle) {
          clearTimeout(notificationTimeoutHandle)
        }

        notificationTimeoutHandle = setTimeout(() => {
          notifications = []
          notificationsContainer.style.zIndex = '-100'
        }, 1000)
      }
    })
  })
</script>

<div>
  <div class="container mt-3">
    <Route path="/">
      <SourcesPage />
    </Route>
    <Route path="source/:sourceID/*" let:params>
      <Editor sourceID={parseInt(params.sourceID)}/>
      <div class="container notifications" bind:this={notificationsContainer}>
        {#each notifications as notification}
          <div class="notification is-{notification.type}">
            <p>{notification.message}</p>
          </div>
        {/each}
      </div>
    </Route>
    <Route path="/dashboard/:dashboardID/:token" let:params>
      <Dashboard id={parseInt(params.dashboardID)} token={params.token} />
    </Route>
  </div>
</div>

<style type='scss'>
  div.container.notifications {
    position: fixed;
    width: 300px;
    height: 100px;
    bottom: 0;
    left: 20px;
    z-index: -100;
  }
</style>