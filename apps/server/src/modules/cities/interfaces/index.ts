import { City } from 'schemas/models/city.js'
import { CreateCity } from '../schemas/index.js'

interface ICityRepository {
  findOne: (id: number) => Promise<City | null>
  findMany: () => Promise<City[]>
  createOne: (data: CreateCity) => Promise<City | null>
  deleteOne: (id: number) => Promise<City | null>
  updateOne: (id: number, data: CreateCity) => Promise<City | null>
}

interface CitiesModuleDependencies {
  cityRepository: ICityRepository
}

export type { ICityRepository, CitiesModuleDependencies }
