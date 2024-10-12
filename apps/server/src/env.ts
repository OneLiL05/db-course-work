import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.string(),
  MEMORY_COST: z.coerce.number().positive(),
  TIME_COST: z.coerce.number().positive(),
  OUTPUT_LENGTH: z.coerce.number().positive(),
  PARALLELISM: z.coerce.number().min(1),
  REDIS_URL: z.string(),
  REDIS_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
})

const env = envSchema.parse(process.env)

export { env, envSchema }
