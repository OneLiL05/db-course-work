import { asClass } from 'awilix'
import { SINGLETON_CONFIG } from '@/constants/config.js'
import { CompaniesDiConfig } from './types/index.js'
import { CompanyRepository } from './repositories/CompanyRepository.js'
import { CompanyAdminRepository } from './repositories/CompanyAdminRepository.js'

export const resolveCompaniesModule = (): CompaniesDiConfig => ({
  companyRepository: asClass(CompanyRepository, SINGLETON_CONFIG),
  companyAdminRepository: asClass(CompanyAdminRepository, SINGLETON_CONFIG),
})
