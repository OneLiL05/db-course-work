import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_POSITION_SCHEMA_TYPE,
  Position,
  PositionWithCount,
} from '@skill-swap/shared'

interface IPositionRepository {
  findOne: (id: number) => Promise<Result<Position, HttpError>>
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<Position[]>
  findManyWithJobsCount: (
    query: BASE_MODEL_QUERY_TYPE,
  ) => Promise<PositionWithCount[]>
  findTopByJobs: () => Promise<PositionWithCount[]>
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
