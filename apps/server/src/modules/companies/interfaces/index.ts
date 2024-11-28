import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import {
  CREATE_COMPANY_ADMIN_SCHEMA_TYPE,
  CREATE_COMPANY_SCHEMA_TYPE,
  Company,
  CompanyAdmin,
  JwtPayload,
} from '@skill-swap/shared'

interface ICompanyRepository {
  findMany: () => Promise<Company[]>
  findOne: (id: number) => Promise<Result<Company, HttpError>>
  findAdmins: (id: number) => Promise<CompanyAdmin[]>
  createOne: (
    data: CREATE_COMPANY_SCHEMA_TYPE,
  ) => Promise<Result<Company, HttpError>>
  updateOne: (
    id: number,
    data: CREATE_COMPANY_SCHEMA_TYPE,
  ) => Promise<Result<Company, HttpError>>
  deleteOne: (id: number) => Promise<Company>
  findUserCompanies: (userId: number) => Promise<Company[]>
  isOwner: (id: number, user: JwtPayload) => Promise<boolean>
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
