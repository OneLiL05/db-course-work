import { sql } from 'drizzle-orm'
import { integer, timestamp } from 'drizzle-orm/pg-core'

const baseSchemaAttrs = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`),
}

export { baseSchemaAttrs }
