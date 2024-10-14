import type { AwilixContainer, NameAndRegistrationPair } from 'awilix'
import {
  CommonDependencies,
  ExternalDependencies,
} from '../interfaces/index.js'
import { resolveCommonDiConfig } from './commonDiConfig.js'
import { resolveAuthModule } from 'modules/auth/index.js'
import { resolveUsersModule } from 'modules/users/index.js'
import type { AuthModuleDependecies } from 'modules/auth/interfaces/index.js'
import type { UsersModuleDependencies } from 'modules/users/interfaces/index.js'
import { resolveCitiesModule } from 'modules/cities/index.js'
import { CitiesModuleDependencies } from 'modules/cities/interfaces/index.js'

type Dependencies = CommonDependencies &
  AuthModuleDependecies &
  UsersModuleDependencies &
  CitiesModuleDependencies

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
  }

  diContainer.register(diConfig)
}

declare module '@fastify/awilix' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Cradle extends Dependencies {}

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RequestCradle extends Dependencies {}
}
