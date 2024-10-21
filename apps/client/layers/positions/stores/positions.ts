import type { Position } from '@skill-swap/shared'

export const usePositionsStore = defineStore(
  'positions',
  () => {
    const positions = ref<Position[]>([])

    const addPosition = (position: Position) => {
      positions.value.push(position)
    }

    const deletePosition = (id: number) => {
      positions.value = positions.value.filter((position) => position.id !== id)
    }

    const updatePosition = ({ id, name }: Position) => {
      const position = positions.value.find((p) => p.id === id)

      if (position) {
        position.name = name
      }
    }

    return { positions, addPosition, deletePosition, updatePosition }
  },
  {
    persist: true,
  },
)
