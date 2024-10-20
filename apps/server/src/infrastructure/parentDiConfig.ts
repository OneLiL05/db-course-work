import type { AwilixContainer, NameAndRegistrationPair } from 'awilix'
import { resolveAuthModule } from 'modules/auth/index.js'
import type { AuthModuleDependecies } from 'modules/auth/interfaces/index.js'
import { resolveCategoriesModule } from 'modules/categories/index.js'
import type { CategoriesModuleDependencies } from 'modules/categories/interfaces/index.js'
import { resolveCitiesModule } from 'modules/cities/index.js'
import type { CitiesModuleDependencies } from 'modules/cities/interfaces/index.js'
import { resolveEmployersModule } from 'modules/employers/index.js'
import type { EmployersModuleDependencies } from 'modules/employers/interfaces/index.js'
import { resolvePositionsModule } from 'modules/positions/index.js'
import type { PositionsModuleDependencies } from 'modules/positions/interfaces/index.js'
import { resolveUsersModule } from 'modules/users/index.js'
import type { UsersModuleDependencies } from 'modules/users/interfaces/index.js'
import {
  CommonDependencies,
  ExternalDependencies,
} from '../interfaces/index.js'
import { resolveCommonDiConfig } from './commonDiConfig.js'
import { JobsModuleDependencies } from 'modules/jobs/interfaces/index.js'
import { resolveJobsModule } from 'modules/jobs/index.js'

type Dependencies = CommonDependencies &
  AuthModuleDependecies &
  UsersModuleDependencies &
  CitiesModuleDependencies &
  CategoriesModuleDependencies &
  PositionsModuleDependencies &
  EmployersModuleDependencies &
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
    ...resolveEmployersModule(),
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
