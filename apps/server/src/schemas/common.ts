import { z } from 'zod'

const ID_SCHEMA = z.coerce.number().min(1)

const GET_BY_ID_SCHEMA = z.object({
  id: ID_SCHEMA,
})

const MESSAGE_SCHEMA = z.object({
  message: z.string(),
})

type ID_SCHEMA_TYPE = z.infer<typeof ID_SCHEMA>
type GET_BY_ID_SCHEMA_TYPE = z.infer<typeof GET_BY_ID_SCHEMA>

export { ID_SCHEMA, GET_BY_ID_SCHEMA, MESSAGE_SCHEMA }
export type { ID_SCHEMA_TYPE, GET_BY_ID_SCHEMA_TYPE }
