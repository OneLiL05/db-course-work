import { Category } from 'schemas/models/category.js'
import { CreateCategory } from '../schemas/index.js'

interface ICategoryRepository {
  findOne: (id: number) => Promise<Category | null>
  findMany: () => Promise<Category[]>
  createOne: (data: CreateCategory) => Promise<Category | null>
  updateOne: (id: number, data: CreateCategory) => Promise<Category | null>
  deleteOne: (id: number) => Promise<Category | null>
}

interface CategoriesModuleDependencies {
  categoryRepository: ICategoryRepository
}

export type { ICategoryRepository, CategoriesModuleDependencies }
