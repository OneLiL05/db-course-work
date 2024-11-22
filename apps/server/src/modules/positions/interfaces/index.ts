import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_POSITION_SCHEMA_TYPE,
  Position,
} from '@skill-swap/shared'

interface IPositionRepository {
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<Position[]>
  findOne: (id: number) => Promise<Position | null>
  createOne: (data: CREATE_POSITION_SCHEMA_TYPE) => Promise<Position | null>
  updateOne: (
    id: number,
    data: CREATE_POSITION_SCHEMA_TYPE,
  ) => Promise<Position | null>
  deleteOne: (id: number) => Promise<Position | null>
}

interface PositionsModuleDependencies {
  positionRepository: IPositionRepository
}

export type { IPositionRepository, PositionsModuleDependencies }
