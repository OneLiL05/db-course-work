import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CITY_SCHEMA_TYPE,
  City,
  CityWithCount,
} from '@skill-swap/shared'
import { Result } from '@/utils/result.js'
import { HttpError } from '@/interfaces/common.js'

interface ICityRepository {
  findOne: (id: number) => Promise<Result<City, HttpError>>
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<City[]>
  findManyWithJobsCount: (
    query: BASE_MODEL_QUERY_TYPE,
  ) => Promise<CityWithCount[]>
  createOne: (data: CREATE_CITY_SCHEMA_TYPE) => Promise<Result<City, HttpError>>
  deleteOne: (id: number) => Promise<Result<City, HttpError>>
  updateOne: (
    id: number,
    data: CREATE_CITY_SCHEMA_TYPE,
  ) => Promise<Result<City, HttpError>>
}

interface CitiesModuleDependencies {
  cityRepository: ICityRepository
}

export type { ICityRepository, CitiesModuleDependencies }
