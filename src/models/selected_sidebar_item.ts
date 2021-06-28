import { selectedSideBarItem as selectedSideBarItemStore } from '../store'

export let setSelectedSideBarItem = (sideBarItem: string) => {
  selectedSideBarItemStore.update(_ => sideBarItem)
}