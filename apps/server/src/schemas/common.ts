import { z } from 'zod'

const ID_SCHEMA = z.number().min(1)

const GET_BY_ID_SCHEMA = z.object({
  id: ID_SCHEMA,
})

type ID_SCHEMA_TYPE = z.infer<typeof ID_SCHEMA>
type GET_BY_ID_SCHEMA_TYPE = z.infer<typeof GET_BY_ID_SCHEMA>

export { ID_SCHEMA, GET_BY_ID_SCHEMA }
export type { ID_SCHEMA_TYPE, GET_BY_ID_SCHEMA_TYPE }
