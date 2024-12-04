import { DatabaseClient, jobs, positions } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_POSITION_SCHEMA_TYPE,
  Position,
  PositionWithCount,
} from '@skill-swap/shared'
import { SQL, asc, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { IPositionRepository } from '../interfaces/index.js'
import { PositionsInjectableDependencies } from '../types/index.js'
import { Failure, Result, Success } from '@/utils/result.js'
import { HttpError } from '@/interfaces/common.js'
import postgres from 'postgres'

export class PositionRepository implements IPositionRepository {
  private readonly db: DatabaseClient

  constructor({ db }: PositionsInjectableDependencies) {
    this.db = db.client
  }

  async findOne(id: number): Promise<Result<Position, HttpError>> {
    const result = await this.db
      .select()
      .from(positions)
      .where(eq(positions.id, id))

    const position = result.at(0)

    if (!position) {
      return Failure({
        status: 404,
        message: 'Position with such id not found',
      })
    }

    return Success(position)
  }

  async findMany(query: BASE_MODEL_QUERY_TYPE): Promise<Position[]> {
    const { order, sortBy } = query

    const expressions: SQL[] = []

    if (sortBy && order) {
      const expression =
        order === 'asc' ? asc(positions[sortBy]) : desc(positions[sortBy])

      expressions.push(expression)
    }

    return this.db
      .select()
      .from(positions)
      .orderBy(...expressions)
  }

  async findManyWithJobsCount(
    query: BASE_MODEL_QUERY_TYPE,
  ): Promise<PositionWithCount[]> {
    const { order, sortBy } = query
    const columns = getTableColumns(positions)

    const expressions: SQL[] = []

    if (sortBy && order) {
      const expression =
        order === 'asc' ? asc(positions[sortBy]) : desc(positions[sortBy])

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
      .from(positions)
      .leftJoin(jobs, eq(jobs.positionId, positions.id))
      .orderBy(...expressions)
      .groupBy(positions.id)
  }

  async createOne({
    name,
  }: CREATE_POSITION_SCHEMA_TYPE): Promise<Result<Position, HttpError>> {
    try {
      const result = await this.db
        .insert(positions)
        .values({ name })
        .returning()

      const position = result.at(0) as Position

      return Success(position)
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
    { name }: CREATE_POSITION_SCHEMA_TYPE,
  ): Promise<Result<Position, HttpError>> {
    try {
      const result = await this.db
        .update(positions)
        .set({ name })
        .where(eq(positions.id, id))
        .returning()

      const position = result.at(0) as Position

      return Success(position)
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

  async deleteOne(id: number): Promise<Result<Position, HttpError>> {
    try {
      const result = await this.db
        .delete(positions)
        .where(eq(positions.id, id))
        .returning()

      const position = result.at(0) as Position

      return Success(position)
    } catch (e: unknown) {
      if (e instanceof postgres.PostgresError && e.code === '23503') {
        return Failure<HttpError>({
          status: 409,
          message: 'Unable to delete the position',
        })
      }

      return Failure<HttpError>({
        status: 500,
        message: 'An unexpected error occured',
      })
    }
  }
}
