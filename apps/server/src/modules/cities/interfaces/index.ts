import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CITY_SCHEMA_TYPE,
  City,
} from '@skill-swap/shared'

interface ICityRepository {
  findOne: (id: number) => Promise<City | null>
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<City[]>
  createOne: (data: CREATE_CITY_SCHEMA_TYPE) => Promise<City | null>
  deleteOne: (id: number) => Promise<City | null>
  updateOne: (id: number, data: CREATE_CITY_SCHEMA_TYPE) => Promise<City | null>
}

interface CitiesModuleDependencies {
  cityRepository: ICityRepository
}

export type { ICityRepository, CitiesModuleDependencies }
