import { SqlClient } from 'types/index.js'
import { IPositionRepository } from '../interfaces/index.js'
import { PositionsInjectableDependencies } from '../types/index.js'
import { Position } from 'schemas/models/position.js'
import { CreatePosition } from '../schemas/index.js'

export class PositionRepository implements IPositionRepository {
  private readonly sql: SqlClient

  constructor({ sql }: PositionsInjectableDependencies) {
    this.sql = sql
  }

  async findOne(id: number): Promise<Position | null> {
    const [position]: [Position?] = await this
      .sql`select * from positions where id=${id}`

    if (!position) return null

    return position
  }

  async findMany(): Promise<Position[]> {
    return this.sql`select * from positions`
  }

  async createOne({ name }: CreatePosition): Promise<Position | null> {
    const positions = await this.sql<Position[]>`
      insert into positions
        (name)
      values
        (${name})
      returning *
    `

    const position = positions.at(0)

    if (!position) return null

    return position
  }

  async updateOne(
    id: number,
    { name }: CreatePosition,
  ): Promise<Position | null> {
    const positions = await this.sql<Position[]>`
      update positions
      set name=${name}
      where id=${id}
      returning *
    `

    const position = positions.at(0)

    if (!position) return null

    return position
  }

  async deleteOne(id: number): Promise<Position | null> {
    const positions = await this.sql<Position[]>`
      delete from positions
      where id=${id}
      returning *
    `

    const position = positions.at(0)

    if (!position) return null

    return position
  }
}
