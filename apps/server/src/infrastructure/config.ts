import { env } from '../env.js'
import {
  AppwriteConfig,
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

const getAppwriteConfig = (): AppwriteConfig => ({
  apiKey: env.APPWRITE_API_KEY,
  endpointUrl: env.APPWRITE_ENDPOINT_URL,
  project: env.APPWRITE_PROJECT,
})

const getConfig = (): Config => ({
  db: getDbConfig(),
  auth: getAuthConfig(),
  redis: getRedisConfig(),
  appwrite: getAppwriteConfig(),
})

export { getConfig }
