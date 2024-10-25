import {
  CREATE_COMPANY_ADMIN_SCHEMA_TYPE,
  CREATE_COMPANY_SCHEMA_TYPE,
  Company,
} from '@skill-swap/shared'

interface ICompanyRepository {
  findMany: () => Promise<Company[]>
  findOne: (id: number) => Promise<Company | null>
  createOne: (data: CREATE_COMPANY_SCHEMA_TYPE) => Promise<Company | null>
  updateOne: (
    id: number,
    data: CREATE_COMPANY_SCHEMA_TYPE,
  ) => Promise<Company | null>
  deleteOne: (id: number) => Promise<Company | null>
  findUserCompanies: (userId: number) => Promise<Company[]>
}

interface ICompanyAdminRepository {
  createOne: (
    id: number,
    data: CREATE_COMPANY_ADMIN_SCHEMA_TYPE,
  ) => Promise<void>
}

interface CompaniesModuleDependencies {
  companyRepository: ICompanyRepository
  companyAdminRepository: ICompanyAdminRepository
}

export type {
  CompaniesModuleDependencies,
  ICompanyRepository,
  ICompanyAdminRepository,
}
