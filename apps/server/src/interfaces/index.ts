import { AppInstanse, Route, SqlClient } from '@/types/index.js'
import type { Config } from './config.js'
import type { Redis } from '@upstash/redis'
import { DatabaseClient } from '@skill-swap/db'

interface CommonDependencies {
  sql: SqlClient
  redis: Redis
  config: Config
  db: {
    client: DatabaseClient
    connection: SqlClient
  }
}

interface ExternalDependencies {
  app: AppInstanse
}

interface Routes {
  routes: Route[]
}

export type { CommonDependencies, ExternalDependencies, Routes }
