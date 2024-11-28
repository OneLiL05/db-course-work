import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_POSITION_SCHEMA_TYPE,
  Position,
} from '@skill-swap/shared'

interface IPositionRepository {
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<Position[]>
  findOne: (id: number) => Promise<Result<Position, HttpError>>
  createOne: (
    data: CREATE_POSITION_SCHEMA_TYPE,
  ) => Promise<Result<Position, HttpError>>
  updateOne: (
    id: number,
    data: CREATE_POSITION_SCHEMA_TYPE,
  ) => Promise<Result<Position, HttpError>>
  deleteOne: (id: number) => Promise<Result<Position, HttpError>>
}

interface PositionsModuleDependencies {
  positionRepository: IPositionRepository
}

export type { IPositionRepository, PositionsModuleDependencies }
