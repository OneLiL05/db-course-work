import { z } from 'zod'
import { BASE_MODEL, BASE_MODEL_WITH_COUNT } from './common.js'
import { ID_SCHEMA } from './index.js'

const CATEGORY_MODEL = BASE_MODEL

type Category = z.infer<typeof CATEGORY_MODEL>

const CATEGORY_SCHEMA_WITH_COUNT = BASE_MODEL_WITH_COUNT

type CategoryWithCount = z.infer<typeof CATEGORY_SCHEMA_WITH_COUNT>

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

export {
  CATEGORY_MODEL,
  CATEGORY_SCHEMA_WITH_COUNT,
  CREATE_CATEGORY_SCHEMA,
  UPDATE_CATEGORY_SCHEMA,
}
export type {
  Category,
  CategoryWithCount,
  CREATE_CATEGORY_SCHEMA_TYPE,
  UPDATE_CATEGORY_SCHEMA_TYPE,
}
