import type { NameAndRegistrationPair } from 'awilix'
import { asFunction, Lifetime } from 'awilix'
import { getConfig } from './config.js'
import postgres from 'postgres'
import { Redis } from '@upstash/redis'
import { CommonDependencies, ExternalDependencies } from '@/interfaces/index.js'
import { SINGLETON_CONFIG } from '@/constants/config.js'
import { db, queryClient } from '@skill-swap/db'
import { Client, Storage } from 'node-appwrite'

export const resolveCommonDiConfig = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dependencies: ExternalDependencies,
): NameAndRegistrationPair<CommonDependencies> => ({
  sql: asFunction(
    ({ config }: CommonDependencies) => {
      return postgres(config.db.dbUrl, { transform: postgres.toCamel })
    },
    {
      dispose: (sql) => {
        sql.end()
      },
      lifetime: Lifetime.SINGLETON,
    },
  ),
  db: asFunction(
    () => {
      return { client: db, connection: queryClient }
    },
    {
      dispose: ({ connection }) => {
        connection.end()
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
  storage: asFunction(({ config }: CommonDependencies) => {
    const client = new Client()

    client
      .setEndpoint(config.appwrite.endpointUrl)
      .setProject(config.appwrite.project)
      .setKey(config.appwrite.apiKey)

    const storage = new Storage(client)

    return storage
  }),
  config: asFunction(() => {
    return getConfig()
  }, SINGLETON_CONFIG),
})
