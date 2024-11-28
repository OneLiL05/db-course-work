import { SqlClient } from '@/types/index.js'
import { DatabaseClient, cities, jobs } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CITY_SCHEMA_TYPE,
  City,
  CityWithCount,
} from '@skill-swap/shared'
import { SQL, asc, count, desc, eq, getTableColumns } from 'drizzle-orm'
import { ICityRepository } from '../interfaces/index.js'
import { CitiesInjectableDependencies } from '../types/index.js'

export class CityRepository implements ICityRepository {
  private readonly sql: SqlClient
  private readonly db: DatabaseClient

  constructor({ sql, db }: CitiesInjectableDependencies) {
    this.sql = sql
    this.db = db.client
  }

  async findOne(id: number): Promise<City | null> {
    const result = await this.db.select().from(cities).where(eq(cities.id, id))

    const city = result.at(0)

    if (!city) return null

    return city
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
      .select({ ...columns, count: count(jobs.id) })
      .from(cities)
      .leftJoin(jobs, eq(jobs.cityId, cities.id))
      .orderBy(...expressions)
      .groupBy(cities.id)
  }

  async createOne({ name }: CREATE_CITY_SCHEMA_TYPE): Promise<City | null> {
    const result = await this.db.insert(cities).values({ name }).returning()

    const city = result.at(0)

    if (!city) return null

    return city
  }

  async updateOne(
    id: number,
    { name }: CREATE_CITY_SCHEMA_TYPE,
  ): Promise<City | null> {
    const result = await this.db
      .update(cities)
      .set({ name })
      .where(eq(cities.id, id))
      .returning()

    const city = result.at(0)

    if (!city) return null

    return city
  }

  async deleteOne(id: number): Promise<City | null> {
    const result = await this.db
      .delete(cities)
      .where(eq(cities.id, id))
      .returning()

    const city = result.at(0)

    if (!city) return null

    return city
  }
}
