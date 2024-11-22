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

  async findOne(id: number): Promise<Skill | null> {
    const result = await this.db.select().from(skills).where(eq(skills.id, id))

    const skill = result.at(0)

    if (!skill) return null

    return skill
  }

  async createOne({ name }: CREATE_SKILL_SCHEMA_TYPE): Promise<Skill | null> {
    const result = await this.db.insert(skills).values({ name }).returning()

    const skill = result.at(0)

    if (!skill) return null

    return skill
  }

  async updateOne(
    id: number,
    { name }: CREATE_SKILL_SCHEMA_TYPE,
  ): Promise<Skill | null> {
    const result = await this.db
      .update(skills)
      .set({ name })
      .where(eq(skills.id, id))
      .returning()

    const skill = result.at(0)

    if (!skill) return null

    return skill
  }

  async deleteOne(id: number): Promise<Skill | null> {
    const result = await this.db
      .delete(skills)
      .where(eq(skills.id, id))
      .returning()

    const skill = result.at(0)

    if (!skill) return null

    return skill
  }
}
