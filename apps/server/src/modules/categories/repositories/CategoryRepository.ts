import { HttpError } from '@/interfaces/common.js'
import { Failure, Result, Success } from '@/utils/result.js'
import { DatabaseClient, categories, jobs } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CATEGORY_SCHEMA_TYPE,
  Category,
} from '@skill-swap/shared'
import { SQL, asc, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { ICategoryRepository } from '../interfaces/index.js'
import { CategoriesInjectableDependencies } from '../types/index.js'
import postgres from 'postgres'

export class CategoryRepository implements ICategoryRepository {
  private readonly db: DatabaseClient

  constructor({ db }: CategoriesInjectableDependencies) {
    this.db = db.client
  }

  async findOne(id: number): Promise<Result<Category, HttpError>> {
    const result = await this.db
      .select()
      .from(categories)
      .where(eq(categories.id, id))

    const category = result.at(0)

    if (!category) {
      return Failure<HttpError>({
        status: 404,
        message: 'Category with such id not found',
      })
    }

    return Success(category)
  }

  async findMany(query: BASE_MODEL_QUERY_TYPE): Promise<Category[]> {
    const { order, sortBy } = query

    const expressions: SQL[] = []

    if (sortBy && order) {
      const expression =
        order === 'asc' ? asc(categories[sortBy]) : desc(categories[sortBy])

      expressions.push(expression)
    }

    return this.db
      .select()
      .from(categories)
      .orderBy(...expressions)
  }

  async findManyWithJobsCount(
    query: BASE_MODEL_QUERY_TYPE,
  ): Promise<Category[]> {
    const { order, sortBy } = query
    const columns = getTableColumns(categories)

    const expressions: SQL[] = []

    if (sortBy && order) {
      const expression =
        order === 'asc' ? asc(categories[sortBy]) : desc(categories[sortBy])

      expressions.push(expression)
    }

    return this.db
      .select({
        ...columns,
        count:
          sql<number>`cast(count(case when ${jobs.isActive} then 1 end) as int)`.as(
            'count',
          ),
      })
      .from(categories)
      .leftJoin(jobs, eq(jobs.categoryId, categories.id))
      .orderBy(...expressions)
      .groupBy(categories.id)
  }

  async createOne({
    name,
  }: CREATE_CATEGORY_SCHEMA_TYPE): Promise<Result<Category, HttpError>> {
    try {
      const result = await this.db
        .insert(categories)
        .values({ name })
        .returning()

      const category = result.at(0) as Category

      return Success(category)
    } catch (e: unknown) {
      if (e instanceof postgres.PostgresError && e.code === '23505') {
        return Failure<HttpError>({
          status: 400,
          message: 'This name is already in use',
        })
      }

      return Failure<HttpError>({
        status: 500,
        message: 'An unexpected error occured',
      })
    }
  }

  async updateOne(
    id: number,
    { name }: CREATE_CATEGORY_SCHEMA_TYPE,
  ): Promise<Result<Category, HttpError>> {
    try {
      const result = await this.db
        .update(categories)
        .set({ name })
        .where(eq(categories.id, id))
        .returning()

      const category = result.at(0) as Category

      return Success(category)
    } catch (e: unknown) {
      if (e instanceof postgres.PostgresError && e.code === '23505') {
        return Failure<HttpError>({
          status: 400,
          message: 'This name is already in use',
        })
      }

      return Failure<HttpError>({
        status: 500,
        message: 'An unexpected error occured',
      })
    }
  }

  async deleteOne(id: number): Promise<Result<Category, HttpError>> {
    try {
      const result = await this.db
        .delete(categories)
        .where(eq(categories.id, id))
        .returning()

      const category = result.at(0) as Category

      return Success(category)
    } catch (e: unknown) {
      if (e instanceof postgres.PostgresError && e.code === '23503') {
        return Failure<HttpError>({
          status: 409,
          message: 'Unable to delete the category',
        })
      }

      return Failure<HttpError>({
        status: 500,
        message: 'An unexpected error occured',
      })
    }
  }
}
