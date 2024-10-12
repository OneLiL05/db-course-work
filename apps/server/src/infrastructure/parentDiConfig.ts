import type { AwilixContainer, NameAndRegistrationPair } from 'awilix'
import {
  CommonDependencies,
  ExternalDependencies,
} from '../interfaces/index.js'
import { resolveCommonDiConfig } from './commonDiConfig.js'
import { resolveAuthModule } from 'modules/auth/index.js'
import { resolveUsersModule } from 'modules/users/index.js'
import type { AuthModuleDependecies } from 'modules/auth/interfaces/index.js'
import type { UserModuleDependencies } from 'modules/users/interfaces/index.js'

type Dependencies = CommonDependencies &
  AuthModuleDependecies &
  UserModuleDependencies

type DiCOnfig = NameAndRegistrationPair<Dependencies>

export const registerDependenies = (
  diContainer: AwilixContainer,
  dependencies: ExternalDependencies,
) => {
  const diConfig: DiCOnfig = {
    ...resolveCommonDiConfig(dependencies),
    ...resolveAuthModule(),
    ...resolveUsersModule(),
  }

  diContainer.register(diConfig)
}

declare module '@fastify/awilix' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Cradle extends Dependencies {}

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RequestCradle extends Dependencies {}
}
