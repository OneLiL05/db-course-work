import { SqlClient } from '@/types/index.js'
import {
  DatabaseClient,
  companies,
  companyAdmins,
  companyRoles,
  users,
} from '@skill-swap/db'
import {
  CREATE_COMPANY_SCHEMA_TYPE,
  Company,
  CompanyAdmin,
  JwtPayload,
} from '@skill-swap/shared'
import { and, eq, getTableColumns } from 'drizzle-orm'
import { ICompanyRepository } from '../interfaces/index.js'
import { CompaniesInjectableDependencies } from '../types/index.js'

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

  async findAdmins(id: number): Promise<CompanyAdmin[]> {
    return this.db
      .select({
        id: companyAdmins.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: companyRoles.name,
      })
      .from(companies)
      .leftJoin(companyAdmins, eq(companyAdmins.companyId, companies.id))
      .leftJoin(companyRoles, eq(companyAdmins.roleId, companyRoles.id))
      .leftJoin(users, eq(companyAdmins.userId, users.id))
      .where(eq(companies.id, id)) as unknown as CompanyAdmin[]
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

  async isOwner(id: number, user: JwtPayload): Promise<boolean> {
    const result = await this.db
      .select({ role: companyRoles.name })
      .from(companies)
      .leftJoin(companyAdmins, eq(companies.id, companyAdmins.companyId))
      .leftJoin(companyRoles, eq(companyAdmins.roleId, companyRoles.id))
      .where(
        and(
          eq(companies.id, id),
          eq(companyAdmins.userId, user.id),
          eq(companyRoles.name, 'owner'),
        ),
      )

    return result.at(0) ? true : false
  }
}
