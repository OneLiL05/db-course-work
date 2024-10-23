import { SqlClient } from '@/types/index.js'
import { Category } from '@skill-swap/shared'
import { ICategoryRepository } from '../interfaces/index.js'
import { CreateCategory } from '../schemas/index.js'
import { CategoriesInjectableDependencies } from '../types/index.js'

export class CategoryRepository implements ICategoryRepository {
  private readonly sql: SqlClient

  constructor({ sql }: CategoriesInjectableDependencies) {
    this.sql = sql
  }

  async findOne(id: number): Promise<Category | null> {
    const [category]: [Category?] = await this.sql`
      select * from categories where id=${id}
    `

    if (!category) return null

    return category
  }

  async findMany(): Promise<Category[]> {
    return this.sql<Category[]>`select * from categories`
  }

  async createOne({ name }: CreateCategory): Promise<Category | null> {
    const categories = await this.sql<Category[]>`
      insert into categories
        (name)
      values
       (${name})
      returning *
    `

    const category = categories.at(0)

    if (!category) return null

    return category
  }

  async updateOne(
    id: number,
    { name }: CreateCategory,
  ): Promise<Category | null> {
    const categories = await this.sql<Category[]>`
      update categories
      set name=${name}
      where id=${id}
      returning *
    `

    const category = categories.at(0)

    if (!category) return null

    return category
  }

  async deleteOne(id: number): Promise<Category | null> {
    const categories = await this.sql<Category[]>`
      delete from categories
      where id=${id}
      returning *
    `

    const category = categories.at(0)

    if (!category) return null

    return category
  }
}
