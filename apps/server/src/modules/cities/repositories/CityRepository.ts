import { ICityRepository } from '../interfaces/index.js'
import { CitiesInjectableDependencies } from '../types/index.js'
import { SqlClient } from '@/types/index.js'
import { CREATE_CITY_SCHEMA_TYPE, City } from '@skill-swap/shared'
import { DatabaseClient, cities } from '@skill-swap/db'
import { eq } from 'drizzle-orm'

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

  async findMany(): Promise<City[]> {
    return this.db.select().from(cities)
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
