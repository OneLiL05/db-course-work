import { AppInstanse, Route, SqlClient } from '@/types/index.js'
import type { Config } from './config.js'
import type { Redis } from '@upstash/redis'

interface CommonDependencies {
  sql: SqlClient
  redis: Redis
  config: Config
}

interface ExternalDependencies {
  app: AppInstanse
}

interface Routes {
  routes: Route[]
}

export type { CommonDependencies, ExternalDependencies, Routes }
