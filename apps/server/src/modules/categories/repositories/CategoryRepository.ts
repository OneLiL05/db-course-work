import { DatabaseClient, categories } from '@skill-swap/db'
import { CREATE_CATEGORY_SCHEMA_TYPE, Category } from '@skill-swap/shared'
import { eq } from 'drizzle-orm'
import { ICategoryRepository } from '../interfaces/index.js'
import { CategoriesInjectableDependencies } from '../types/index.js'

export class CategoryRepository implements ICategoryRepository {
  private readonly db: DatabaseClient

  constructor({ db }: CategoriesInjectableDependencies) {
    this.db = db.client
  }

  async findOne(id: number): Promise<Category | null> {
    const result = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, id))

    const category = result.at(0)

    if (!category) return null

    return category
  }

  async findMany(): Promise<Category[]> {
    return this.db.select().from(categories)
  }

  async createOne({
    name,
  }: CREATE_CATEGORY_SCHEMA_TYPE): Promise<Category | null> {
    const result = await this.db.insert(categories).values({ name }).returning()

    const category = result.at(0)

    if (!category) return null

    return category
  }

  async updateOne(
    id: number,
    { name }: CREATE_CATEGORY_SCHEMA_TYPE,
  ): Promise<Category | null> {
    const result = await this.db
      .update(categories)
      .set({ name })
      .where(eq(categories.id, id))
      .returning()

    const category = result.at(0)

    if (!category) return null

    return category
  }

  async deleteOne(id: number): Promise<Category | null> {
    const result = await this.db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning()

    const category = result.at(0)

    if (!category) return null

    return category
  }
}
