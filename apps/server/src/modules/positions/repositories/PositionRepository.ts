import { DatabaseClient, positions } from '@skill-swap/db'
import { CREATE_POSITION_SCHEMA_TYPE, Position } from '@skill-swap/shared'
import { IPositionRepository } from '../interfaces/index.js'
import { PositionsInjectableDependencies } from '../types/index.js'
import { eq } from 'drizzle-orm'

export class PositionRepository implements IPositionRepository {
  private readonly db: DatabaseClient

  constructor({ db }: PositionsInjectableDependencies) {
    this.db = db.client
  }

  async findOne(id: number): Promise<Position | null> {
    const result = await this.db
      .select()
      .from(positions)
      .where(eq(positions.id, id))

    const position = result.at(0)

    if (!position) return null

    return position
  }

  async findMany(): Promise<Position[]> {
    return this.db.select().from(positions)
  }

  async createOne({
    name,
  }: CREATE_POSITION_SCHEMA_TYPE): Promise<Position | null> {
    const result = await this.db.insert(positions).values({ name }).returning()

    const position = result.at(0)

    if (!position) return null

    return position
  }

  async updateOne(
    id: number,
    { name }: CREATE_POSITION_SCHEMA_TYPE,
  ): Promise<Position | null> {
    const result = await this.db
      .update(positions)
      .set({ name })
      .where(eq(positions.id, id))
      .returning()

    const position = result.at(0)

    if (!position) return null

    return position
  }

  async deleteOne(id: number): Promise<Position | null> {
    const result = await this.db.delete(positions).where(eq(positions.id, id))

    const position = result.at(0)

    if (!position) return null

    return position
  }
}
