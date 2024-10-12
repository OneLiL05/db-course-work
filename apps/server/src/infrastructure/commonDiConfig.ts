import type { NameAndRegistrationPair } from 'awilix'
import { asFunction, Lifetime } from 'awilix'
import { getConfig } from './config.js'
import postgres from 'postgres'
import { CommonDependencies, ExternalDependencies } from 'interfaces/index.js'
import { Redis } from '@upstash/redis'
import { SINGLETON_CONFIG } from 'constants/config.js'

export const resolveCommonDiConfig = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dependencies: ExternalDependencies,
): NameAndRegistrationPair<CommonDependencies> => ({
  sql: asFunction(
    ({ config }: CommonDependencies) => {
      return postgres(config.db.dbUrl)
    },
    {
      dispose: (sql) => {
        sql.end()
      },
      lifetime: Lifetime.SINGLETON,
    },
  ),
  redis: asFunction(({ config }: CommonDependencies) => {
    return new Redis({
      url: config.redis.url,
      token: config.redis.token,
    })
  }, SINGLETON_CONFIG),
  config: asFunction(() => {
    return getConfig()
  }, SINGLETON_CONFIG),
})
