import { SqlClient } from '@/types/index.js'
import { CompaniesInjectableDependencies } from '../types/index.js'
import { ICompanyAdminRepository } from '../interfaces/index.js'
import { CREATE_COMPANY_ADMIN_SCHEMA_TYPE } from '@skill-swap/shared'

export class CompanyAdminRepository implements ICompanyAdminRepository {
  private readonly sql: SqlClient

  constructor({ sql }: CompaniesInjectableDependencies) {
    this.sql = sql
  }

  async createOne(
    id: number,
    data: CREATE_COMPANY_ADMIN_SCHEMA_TYPE,
  ): Promise<void> {
    const { role, userId } = data

    const companyRoleId = role === 'owner' ? 1 : 2

    await this.sql`
      insert into company_admins
        (user_id, company_role_id, company_id)
      values
        (${userId}, ${companyRoleId}, ${id})
    `
  }
}
