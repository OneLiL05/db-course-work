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

interface Config {
  db: DbConfig
  auth: AuthConfig
  redis: RedisConfig
}

export type { Config, DbConfig, AuthConfig, RedisConfig }
