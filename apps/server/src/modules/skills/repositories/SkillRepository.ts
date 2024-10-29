import { SqlClient } from '@/types/index.js'
import { CREATE_SKILL_SCHEMA_TYPE, Skill } from '@skill-swap/shared'
import { ISkillRepository } from '../interfaces/index.js'
import { SkillInjectableDependencies } from '../types/index.js'

export class SkillRepository implements ISkillRepository {
  private readonly sql: SqlClient

  constructor({ sql }: SkillInjectableDependencies) {
    this.sql = sql
  }

  async findMany(): Promise<Skill[]> {
    return this.sql<Skill[]>`select * from skills`
  }

  async findOne(id: number): Promise<Skill | null> {
    const [skill]: [Skill?] = await this
      .sql`select * from skills where id = ${id}`

    if (!skill) return null

    return skill
  }

  async createOne({ name }: CREATE_SKILL_SCHEMA_TYPE): Promise<Skill | null> {
    const skills = await this.sql<Skill[]>`
      insert into skills
        (name)
      values
        (${name})
      returning *
    `

    const skill = skills.at(0)

    if (!skill) return null

    return skill
  }

  async updateOne(
    id: number,
    { name }: CREATE_SKILL_SCHEMA_TYPE,
  ): Promise<Skill | null> {
    const skills = await this.sql<Skill[]>`
      update skills
      set name = ${name}
      where id = ${id}
      returning *
    `

    const skill = skills.at(0)

    if (!skill) return null

    return skill
  }

  async deleteOne(id: number): Promise<Skill | null> {
    const skills = await this.sql<Skill[]>`
      delete from skills
      where id = ${id}
      returning *
    `

    const skill = skills.at(0)

    if (!skill) return null

    return skill
  }
}
