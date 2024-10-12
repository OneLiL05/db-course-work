import { env } from '../env.js'
import {
  AuthConfig,
  Config,
  DbConfig,
  RedisConfig,
} from '../interfaces/config.js'

const getDbConfig = (): DbConfig => ({
  dbUrl: env.DATABASE_URL,
})

const getAuthConfig = (): AuthConfig => ({
  memoryCost: env.MEMORY_COST,
  timeCost: env.TIME_COST,
  outputLength: env.OUTPUT_LENGTH,
  parallelism: env.PARALLELISM,
  jwtSecret: env.JWT_SECRET,
  cookieSecret: env.COOKIE_SECRET,
})

const getRedisConfig = (): RedisConfig => ({
  url: env.REDIS_URL,
  token: env.REDIS_PASSWORD,
})

const getConfig = (): Config => ({
  db: getDbConfig(),
  auth: getAuthConfig(),
  redis: getRedisConfig(),
})

export { getConfig }
