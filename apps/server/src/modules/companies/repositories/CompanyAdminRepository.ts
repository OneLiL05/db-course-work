import { DatabaseClient, companyAdmins } from '@skill-swap/db'
import { CREATE_COMPANY_ADMIN_SCHEMA_TYPE } from '@skill-swap/shared'
import { ICompanyAdminRepository } from '../interfaces/index.js'
import { CompaniesInjectableDependencies } from '../types/index.js'

export class CompanyAdminRepository implements ICompanyAdminRepository {
  private readonly db: DatabaseClient

  constructor({ db }: CompaniesInjectableDependencies) {
    this.db = db.client
  }

  async createOne(
    id: number,
    data: CREATE_COMPANY_ADMIN_SCHEMA_TYPE,
  ): Promise<void> {
    const { role, userId } = data

    const roleId = role === 'owner' ? 1 : 2

    await this.db
      .insert(companyAdmins)
      .values({ userId, roleId, companyId: id })
  }
}
