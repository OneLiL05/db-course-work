import { ICompanyRepository } from '../interfaces/index.js'
import { CompaniesInjectableDependencies } from '../types/index.js'
import { SqlClient } from '@/types/index.js'
import { CREATE_COMPANY_SCHEMA_TYPE, Company } from '@skill-swap/shared'

export class CompanyRepository implements ICompanyRepository {
  private readonly sql: SqlClient

  constructor({ sql }: CompaniesInjectableDependencies) {
    this.sql = sql
  }

  async findOne(id: number): Promise<Company | null> {
    const [company]: [Company?] = await this.sql`
      select * from companies where id=${id}
    `

    if (!company) return null

    return company
  }

  async findMany(): Promise<Company[]> {
    return this.sql`select * from companies`
  }

  async findUserCompanies(userId: number): Promise<Company[]> {
    return this.sql<Company[]>`
      select *
      from companies as c
      join company_admins as c_a on c.id = c_a.company_id
      where c_a.user_id = ${userId} and c_a.company_role_id = 1
    `
  }

  async createOne({
    name,
    description,
  }: CREATE_COMPANY_SCHEMA_TYPE): Promise<Company | null> {
    const companies = await this.sql<Company[]>`
      insert into companies
        (name, description, is_verified)
      values
        (${name}, ${description}, false)
      returning *
    `

    const company = companies.at(0)

    if (!company) return null

    return company
  }

  async updateOne(
    id: number,
    data: CREATE_COMPANY_SCHEMA_TYPE,
  ): Promise<Company | null> {
    const { name, description } = data

    const employers = await this.sql<Company[]>`
      update companies
      set name=${name}, description=${description}
      where id=${id}
      returning *
    `

    const employer = employers.at(0)

    if (!employer) return null

    return employer
  }

  async deleteOne(id: number): Promise<Company | null> {
    const employers = await this.sql<Company[]>`
      update companies
      set is_deleted=true
      where id=${id}
      returning *
    `

    const employer = employers.at(0)

    if (!employer) return null

    return employer
  }
}
