import { SqlClient } from 'types/index.js'
import { ICityRepository } from '../interfaces/index.js'
import { CitiesInjectableDependencies } from '../types/index.js'
import { City } from 'schemas/models/city.js'
import { CreateCity } from '../schemas/index.js'

export class CityRepository implements ICityRepository {
  private readonly sql: SqlClient

  constructor({ sql }: CitiesInjectableDependencies) {
    this.sql = sql
  }

  async findOne(id: number): Promise<City | null> {
    const [city]: [City?] = await this.sql`select * from cities where id=${id}`

    if (!city) return null

    return city
  }

  async findMany(): Promise<City[]> {
    return this.sql<City[]>`select * from cities`
  }

  async createOne({ name }: CreateCity): Promise<City | null> {
    const cities = await this.sql<City[]>`
      insert into cities
        (name)
      values
        (${name})
      returning *
    `

    const city = cities.at(0)

    if (!city) return null

    return city
  }

  async updateOne(id: number, { name }: CreateCity): Promise<City | null> {
    const cities = await this.sql<City[]>`
      update cities
      set name=${name}
      where id=${id}
      returning *
    `

    const city = cities.at(0)

    if (!city) return null

    return city
  }

  async deleteOne(id: number): Promise<City | null> {
    const cities = await this.sql<
      City[]
    >`delete from cities where id=${id} returning *`

    const city = cities.at(0)

    if (!city) return null

    return city
  }
}
