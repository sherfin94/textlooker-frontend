import { selectedVisualization as selectedVisualizationStore } from '../store'

export let setSelectedVisualization = (Visualization: string) => {
  selectedVisualizationStore.update(_ => Visualization)
}