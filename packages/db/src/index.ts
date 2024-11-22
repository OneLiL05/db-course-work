import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schemas/index.js'

const queryClient = postgres(process.env.DATABASE_URL as string)

const db = drizzle(queryClient, { schema, logger: true })

type DatabaseClient = PostgresJsDatabase<typeof schema>

export { queryClient, db, type DatabaseClient }
export * from './schemas/index.js'
