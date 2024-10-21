import { z } from 'zod'
import { BASE_MODEL } from './common.js'

const POSITION_SCHEMA = BASE_MODEL

type Position = z.infer<typeof POSITION_SCHEMA>

const CREATE_POSITION_SCHEMA = z.object({
  name: z
    .string({ required_error: 'Position name is required' })
    .min(4)
    .max(128),
})

type CREATE_POSITION_SCHEMA_TYPE = z.infer<typeof CREATE_POSITION_SCHEMA>

export { POSITION_SCHEMA, CREATE_POSITION_SCHEMA }
export type { Position, CREATE_POSITION_SCHEMA_TYPE }
