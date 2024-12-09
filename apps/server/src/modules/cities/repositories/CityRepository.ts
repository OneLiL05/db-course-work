import { HttpError } from '@/interfaces/common.js'
import { Failure, Result, Success } from '@/utils/result.js'
import { DatabaseClient, cities, jobs } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CITY_SCHEMA_TYPE,
  City,
  CityWithCount,
} from '@skill-swap/shared'
import { SQL, asc, count, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import postgres from 'postgres'
import { ICityRepository } from '../interfaces/index.js'
import { CitiesInjectableDependencies } from '../types/index.js'

export class CityRepository implements ICityRepository {
  private readonly db: DatabaseClient

  constructor({ db }: CitiesInjectableDependencies) {
    this.db = db.client
  }

  async findOne(id: number): Promise<Result<City, HttpError>> {
    const result = await this.db.select().from(cities).where(eq(cities.id, id))

    const city = result.at(0)

    if (!city) {
      return Failure<HttpError>({
        status: 404,
        message: 'City with such id not found',
      })
    }

    return Success(city)
  }

  async findMany(query: BASE_MODEL_QUERY_TYPE): Promise<City[]> {
    const { order, sortBy } = query

    const expressions: SQL[] = []

    if (sortBy && order) {
      const expression =
        order === 'asc' ? asc(cities[sortBy]) : desc(cities[sortBy])

      expressions.push(expression)
    }

    return this.db
      .select()
      .from(cities)
      .orderBy(...expressions)
  }

  async findManyWithJobsCount(
    query: BASE_MODEL_QUERY_TYPE,
  ): Promise<CityWithCount[]> {
    const { order, sortBy } = query
    const columns = getTableColumns(cities)

    const expressions: SQL[] = []

    if (sortBy && order) {
      const expression =
        order === 'asc' ? asc(cities[sortBy]) : desc(cities[sortBy])

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
      .from(cities)
      .leftJoin(jobs, eq(jobs.cityId, cities.id))
      .orderBy(...expressions)
      .groupBy(cities.id)
  }

  async findTopByJobs(): Promise<CityWithCount[]> {
    const columns = getTableColumns(cities)

    return this.db
      .select({ ...columns, count: sql<number>`cast(count(*) as int)` })
      .from(jobs)
      .leftJoin(cities, eq(jobs.cityId, cities.id))
      .where(eq(jobs.isActive, true))
      .groupBy(cities.id)
      .orderBy(desc(count()))
      .limit(5) as unknown as CityWithCount[]
  }

  async createOne({
    name,
  }: CREATE_CITY_SCHEMA_TYPE): Promise<Result<City, HttpError>> {
    try {
      const result = await this.db.insert(cities).values({ name }).returning()

      const city = result.at(0) as City

      return Success(city)
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
    { name }: CREATE_CITY_SCHEMA_TYPE,
  ): Promise<Result<City, HttpError>> {
    try {
      const result = await this.db
        .update(cities)
        .set({ name })
        .where(eq(cities.id, id))
        .returning()

      const city = result.at(0) as City

      return Success(city)
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

  async deleteOne(id: number): Promise<Result<City, HttpError>> {
    try {
      const result = await this.db
        .delete(cities)
        .where(eq(cities.id, id))
        .returning()

      const city = result.at(0) as City

      return Success(city)
    } catch (e: unknown) {
      if (e instanceof postgres.PostgresError && e.code === '23503') {
        return Failure<HttpError>({
          status: 409,
          message: 'Unable to delete the city',
        })
      }

      return Failure<HttpError>({
        status: 500,
        message: 'An unexpected error occured',
      })
    }
  }
}
