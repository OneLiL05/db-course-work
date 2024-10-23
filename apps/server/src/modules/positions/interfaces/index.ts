import { Position } from '@skill-swap/shared'
import { CreatePosition } from '../schemas/index.js'

interface IPositionRepository {
  findMany: () => Promise<Position[]>
  findOne: (id: number) => Promise<Position | null>
  createOne: (data: CreatePosition) => Promise<Position | null>
  updateOne: (id: number, data: CreatePosition) => Promise<Position | null>
  deleteOne: (id: number) => Promise<Position | null>
}

interface PositionsModuleDependencies {
  positionRepository: IPositionRepository
}

export type { IPositionRepository, PositionsModuleDependencies }
