import { z } from 'zod'
import { BASE_MODEL } from './common.js'
import { ID_SCHEMA } from './index.js'

const CATEGORY_MODEL = BASE_MODEL

type Category = z.infer<typeof CATEGORY_MODEL>

const CREATE_CATEGORY_SCHEMA = z.object({
  name: z
    .string({ required_error: 'Category name is required' })
    .min(4)
    .max(128),
})

type CREATE_CATEGORY_SCHEMA_TYPE = z.infer<typeof CREATE_CATEGORY_SCHEMA>

const UPDATE_CATEGORY_SCHEMA = z.object({
  id: ID_SCHEMA,
  name: z
    .string({ required_error: 'Category name is required' })
    .min(4)
    .max(128),
})

type UPDATE_CATEGORY_SCHEMA_TYPE = z.infer<typeof UPDATE_CATEGORY_SCHEMA>

export { CATEGORY_MODEL, CREATE_CATEGORY_SCHEMA, UPDATE_CATEGORY_SCHEMA }
export type {
  Category,
  CREATE_CATEGORY_SCHEMA_TYPE,
  UPDATE_CATEGORY_SCHEMA_TYPE,
}
