import type { AwilixContainer, NameAndRegistrationPair } from 'awilix'
import {
  CommonDependencies,
  ExternalDependencies,
} from '../interfaces/index.js'
import { resolveCommonDiConfig } from './commonDiConfig.js'
import { resolveAuthModule } from '@/modules/auth/index.js'
import { resolveUsersModule } from '@/modules/users/index.js'
import { AuthModuleDependecies } from '@/modules/auth/interfaces/index.js'
import { resolveCategoriesModule } from '@/modules/categories/index.js'
import { CategoriesModuleDependencies } from '@/modules/categories/interfaces/index.js'
import { resolveCitiesModule } from '@/modules/cities/index.js'
import { CitiesModuleDependencies } from '@/modules/cities/interfaces/index.js'
import { resolveJobsModule } from '@/modules/jobs/index.js'
import { JobsModuleDependencies } from '@/modules/jobs/interfaces/index.js'
import { resolvePositionsModule } from '@/modules/positions/index.js'
import { PositionsModuleDependencies } from '@/modules/positions/interfaces/index.js'
import { UsersModuleDependencies } from '@/modules/users/interfaces/index.js'
import { CompaniesModuleDependencies } from '@/modules/companies/interfaces/index.js'
import { resolveCompaniesModule } from '@/modules/companies/index.js'

type Dependencies = CommonDependencies &
  AuthModuleDependecies &
  UsersModuleDependencies &
  CitiesModuleDependencies &
  CategoriesModuleDependencies &
  PositionsModuleDependencies &
  CompaniesModuleDependencies &
  JobsModuleDependencies

type DiCOnfig = NameAndRegistrationPair<Dependencies>

export const registerDependenies = (
  diContainer: AwilixContainer,
  dependencies: ExternalDependencies,
) => {
  const diConfig: DiCOnfig = {
    ...resolveCommonDiConfig(dependencies),
    ...resolveAuthModule(),
    ...resolveUsersModule(),
    ...resolveCitiesModule(),
    ...resolveCategoriesModule(),
    ...resolvePositionsModule(),
    ...resolveCompaniesModule(),
    ...resolveJobsModule(),
  }

  diContainer.register(diConfig)
}

declare module '@fastify/awilix' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Cradle extends Dependencies {}

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RequestCradle extends Dependencies {}
}
