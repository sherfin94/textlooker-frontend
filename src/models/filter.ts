import { currentFilter as filterStore } from '../store'
import type { filterItem } from '../interface'

export let AddFilterItem = (item: filterItem) => {
  filterStore.update(filter => [...filter, item])
}

export let RemoveFilterItem = (index: number) => {
  filterStore.update(filter => [...filter.slice(0, index), ...filter.slice(index+1)])
}

export let resetFilter = () => {
  filterStore.update(_ => [])
}