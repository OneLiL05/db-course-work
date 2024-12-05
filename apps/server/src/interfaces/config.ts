interface DbConfig {
  dbUrl: string
}

interface AuthConfig {
  memoryCost: number
  timeCost: number
  outputLength: number
  parallelism: number
  jwtSecret: string
  cookieSecret: string
}

interface RedisConfig {
  url: string
  token: string
}

interface AppwriteConfig {
  endpointUrl: string
  project: string
  apiKey: string
}

interface Config {
  db: DbConfig
  auth: AuthConfig
  redis: RedisConfig
  appwrite: AppwriteConfig
}

export type { Config, DbConfig, AuthConfig, RedisConfig, AppwriteConfig }
