import type { Position } from '@skill-swap/shared'

export const usePositionsStore = defineStore(
  'positions',
  () => {
    const positions = ref<Position[]>([])

    const addPosition = (position: Position) => {
      positions.value.push(position)
    }

    return { positions, addPosition }
  },
  {
    persist: true,
  },
)
