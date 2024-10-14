import { SqlClient } from 'types/index.js'
import { IEmployerRepository } from '../interfaces/index.js'
import { EmployersInjectableDependencies } from '../types/index.js'
import { Employer } from 'schemas/models/employer.js'
import { CreateEmployer } from '../schemas/index.js'

export class EmployerRepository implements IEmployerRepository {
  private readonly sql: SqlClient

  constructor({ sql }: EmployersInjectableDependencies) {
    this.sql = sql
  }

  async findOne(id: number): Promise<Employer | null> {
    const [employer]: [Employer?] = await this.sql`
      select * from employers where id=${id}
    `

    if (!employer) return null

    return employer
  }

  async findMany(): Promise<Employer[]> {
    return this.sql`select * from employers`
  }

  async createOne({
    name,
    description,
  }: CreateEmployer): Promise<Employer | null> {
    const employers = await this.sql<Employer[]>`
      insert into employers
        (name, description)
      values
        (${name}, ${description})
      returning *
    `

    const employer = employers.at(0)

    if (!employer) return null

    return employer
  }

  async updateOne(
    id: number,
    { name, description, isVerified }: CreateEmployer,
  ): Promise<Employer | null> {
    const employers = await this.sql<Employer[]>`
      update employers
      set name=${name}, description=${description}, is_verified=${isVerified}
      where id=${id}
      returning *
    `

    const employer = employers.at(0)

    if (!employer) return null

    return employer
  }

  async deleteOne(id: number): Promise<Employer | null> {
    const employers = await this.sql<Employer[]>`
      update employers
      set is_deleted=true
      where id=${id}
      returning *
    `

    const employer = employers.at(0)

    if (!employer) return null

    return employer
  }
}
