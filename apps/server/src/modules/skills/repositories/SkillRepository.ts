import { DatabaseClient, skillLevels, skills } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_SKILL_SCHEMA_TYPE,
  Skill,
  SkillLevel,
} from '@skill-swap/shared'
import { SQL, asc, desc, eq } from 'drizzle-orm'
import { ISkillRepository } from '../interfaces/index.js'
import { SkillInjectableDependencies } from '../types/index.js'
import { Failure, Result, Success } from '@/utils/result.js'
import { HttpError } from '@/interfaces/common.js'
import postgres from 'postgres'

export class SkillRepository implements ISkillRepository {
  private readonly db: DatabaseClient

  constructor({ db }: SkillInjectableDependencies) {
    this.db = db.client
  }

  async findMany(query: BASE_MODEL_QUERY_TYPE): Promise<Skill[]> {
    const { order, sortBy } = query

    const expressions: SQL[] = []

    if (sortBy && order) {
      const expression =
        order === 'asc' ? asc(skills[sortBy]) : desc(skills[sortBy])

      expressions.push(expression)
    }

    return this.db
      .select()
      .from(skills)
      .orderBy(...expressions)
  }

  async findLevels(): Promise<SkillLevel[]> {
    return this.db
      .select({ id: skillLevels.id, name: skillLevels.name })
      .from(skillLevels)
      .orderBy(asc(skillLevels.id))
  }

  async findOne(id: number): Promise<Result<Skill, HttpError>> {
    const result = await this.db.select().from(skills).where(eq(skills.id, id))

    const skill = result.at(0)

    if (!skill) {
      return Failure<HttpError>({
        status: 404,
        message: 'Skill with such id not found',
      })
    }

    return Success(skill)
  }

  async createOne({
    name,
  }: CREATE_SKILL_SCHEMA_TYPE): Promise<Result<Skill, HttpError>> {
    try {
      const result = await this.db.insert(skills).values({ name }).returning()

      const skill = result.at(0) as Skill

      return Success(skill)
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
    { name }: CREATE_SKILL_SCHEMA_TYPE,
  ): Promise<Result<Skill, HttpError>> {
    try {
      const result = await this.db
        .update(skills)
        .set({ name })
        .where(eq(skills.id, id))
        .returning()

      const skill = result.at(0) as Skill

      return Success(skill)
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

  async deleteOne(id: number): Promise<Result<Skill, HttpError>> {
    try {
      const result = await this.db
        .delete(skills)
        .where(eq(skills.id, id))
        .returning()

      const skill = result.at(0) as Skill

      return Success(skill)
    } catch (e: unknown) {
      if (e instanceof postgres.PostgresError && e.code === '23503') {
        return Failure<HttpError>({
          status: 409,
          message: 'Unable to delete the the skill',
        })
      }

      return Failure<HttpError>({
        status: 500,
        message: 'An unexpected error occured',
      })
    }
  }
}
