import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CATEGORY_SCHEMA_TYPE,
  Category,
} from '@skill-swap/shared'

interface ICategoryRepository {
  findOne: (id: number) => Promise<Result<Category, HttpError>>
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<Category[]>
  findManyWithJobsCount: (query: BASE_MODEL_QUERY_TYPE) => Promise<Category[]>
  createOne: (
    data: CREATE_CATEGORY_SCHEMA_TYPE,
  ) => Promise<Result<Category, HttpError>>
  updateOne: (
    id: number,
    data: CREATE_CATEGORY_SCHEMA_TYPE,
  ) => Promise<Result<Category, HttpError>>
  deleteOne: (id: number) => Promise<Result<Category, HttpError>>
}

interface CategoriesModuleDependencies {
  categoryRepository: ICategoryRepository
}

export type { ICategoryRepository, CategoriesModuleDependencies }
