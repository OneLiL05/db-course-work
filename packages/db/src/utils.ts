import { SQL, sql } from 'drizzle-orm'
import { PgColumn, integer, timestamp } from 'drizzle-orm/pg-core'

const baseSchemaAttrs = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
}

const jsonBuildObject = <T extends Record<string, PgColumn | SQL>>(
  shape: T,
) => {
  const chunks: SQL[] = []

  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(','))
    }
    chunks.push(sql.raw(`'${key}',`))
    chunks.push(sql`${value}`)
  })

  return sql`json_build_object(${sql.join(chunks)})`
}

const jsonAgg = (expression: SQL) => {
  return sql`json_agg(${expression})`
}

export { baseSchemaAttrs, jsonBuildObject, jsonAgg }
