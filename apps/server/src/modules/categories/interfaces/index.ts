import { CREATE_CATEGORY_SCHEMA_TYPE, Category } from '@skill-swap/shared'

interface ICategoryRepository {
  findOne: (id: number) => Promise<Category | null>
  findMany: () => Promise<Category[]>
  createOne: (data: CREATE_CATEGORY_SCHEMA_TYPE) => Promise<Category | null>
  updateOne: (
    id: number,
    data: CREATE_CATEGORY_SCHEMA_TYPE,
  ) => Promise<Category | null>
  deleteOne: (id: number) => Promise<Category | null>
}

interface CategoriesModuleDependencies {
  categoryRepository: ICategoryRepository
}

export type { ICategoryRepository, CategoriesModuleDependencies }
