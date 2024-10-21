import { z } from 'zod'
import { BASE_MODEL } from './common.js'
import { ID_SCHEMA } from './index.js'

const POSITION_SCHEMA = BASE_MODEL

type Position = z.infer<typeof POSITION_SCHEMA>

const CREATE_POSITION_SCHEMA = z.object({
  name: z
    .string({ required_error: 'Position name is required' })
    .min(4)
    .max(128),
})

type CREATE_POSITION_SCHEMA_TYPE = z.infer<typeof CREATE_POSITION_SCHEMA>

const DELETE_POSITION_SCHEMA = z.object({
  id: z.coerce.number().min(1),
})

type DELETE_POSITION_SCHEMA_TYPE = z.infer<typeof DELETE_POSITION_SCHEMA>

const UPDATE_POSITION_SCHEMA = z.object({
  id: ID_SCHEMA,
  name: z.string({ required_error: 'City name is required' }).min(4).max(128),
})

type UPDATE_POSITION_SCHEMA_TYPE = z.infer<typeof UPDATE_POSITION_SCHEMA>

export {
  POSITION_SCHEMA,
  CREATE_POSITION_SCHEMA,
  DELETE_POSITION_SCHEMA,
  UPDATE_POSITION_SCHEMA,
}
export type {
  Position,
  CREATE_POSITION_SCHEMA_TYPE,
  DELETE_POSITION_SCHEMA_TYPE,
  UPDATE_POSITION_SCHEMA_TYPE,
}
