import { DatabaseClient, companies, companyAdmins } from '@skill-swap/db'
import { ICompanyRepository } from '../interfaces/index.js'
import { CompaniesInjectableDependencies } from '../types/index.js'
import { SqlClient } from '@/types/index.js'
import { CREATE_COMPANY_SCHEMA_TYPE, Company } from '@skill-swap/shared'
import { eq, and, getTableColumns } from 'drizzle-orm'

export class CompanyRepository implements ICompanyRepository {
  private readonly sql: SqlClient
  private readonly db: DatabaseClient

  constructor({ sql, db }: CompaniesInjectableDependencies) {
    this.sql = sql
    this.db = db.client
  }

  async findOne(id: number): Promise<Company | null> {
    const result = await this.db
      .select()
      .from(companies)
      .where(eq(companies.id, id))

    const company = result.at(0)

    if (!company) return null

    return company
  }

  async findMany(): Promise<Company[]> {
    return this.db.select().from(companies)
  }

  async findUserCompanies(userId: number): Promise<Company[]> {
    const columns = getTableColumns(companies)

    return this.db
      .select({ ...columns })
      .from(companies)
      .innerJoin(companyAdmins, eq(companies.id, companyAdmins.companyId))
      .where(
        and(
          eq(companyAdmins.userId, userId),
          eq(companyAdmins.roleId, 1),
          eq(companies.isDeleted, false),
        ),
      )
  }

  async createOne({
    name,
    description,
  }: CREATE_COMPANY_SCHEMA_TYPE): Promise<Company | null> {
    const result = await this.db
      .insert(companies)
      .values({ name, description, isVerified: false, img: '/' })
      .returning()

    const company = result.at(0)

    if (!company) return null

    return company
  }

  async updateOne(
    id: number,
    data: CREATE_COMPANY_SCHEMA_TYPE,
  ): Promise<Company | null> {
    const { name, description } = data

    const result = await this.db
      .update(companies)
      .set({ name, description })
      .where(eq(companies.id, id))
      .returning()

    const company = result.at(0)

    if (!company) return null

    return company
  }

  async deleteOne(id: number): Promise<Company | null> {
    const result = await this.db
      .update(companies)
      .set({ isDeleted: true })
      .where(eq(companies.id, id))
      .returning()

    const company = result.at(0)

    if (!company) return null

    return company
  }
}
