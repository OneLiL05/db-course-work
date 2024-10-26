import { z } from 'zod'

const ID_SCHEMA = z.coerce.number().min(1)

const GET_BY_ID_SCHEMA = z.object({
  id: ID_SCHEMA,
})

const MESSAGE_SCHEMA = z.object({
  message: z.string(),
})

type GET_BY_ID_SCHEMA_TYPE = z.infer<typeof GET_BY_ID_SCHEMA>

export { ID_SCHEMA, GET_BY_ID_SCHEMA, MESSAGE_SCHEMA }
export type { GET_BY_ID_SCHEMA_TYPE }

export * from './auth.js'
export * from './category.js'
export * from './city.js'
export * from './user.js'
export * from './position.js'
export * from './company.js'
export * from './job.js'
