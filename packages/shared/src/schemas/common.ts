import { z } from 'zod'

const BASE_MODEL = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(4).max(128),
})

const BASE_MODEL_WITH_COUNT = BASE_MODEL.extend({
  count: z.number(),
})

const ORDER_SCHEMA = z.enum(['asc', 'desc'])

const BASE_MODEL_QUERY = z.object({
  order: ORDER_SCHEMA.optional(),
  sortBy: z.enum(['id', 'name']).optional(),
})

type BASE_MODEL_QUERY_TYPE = z.infer<typeof BASE_MODEL_QUERY>

export { BASE_MODEL, BASE_MODEL_WITH_COUNT, ORDER_SCHEMA, BASE_MODEL_QUERY }
export type { BASE_MODEL_QUERY_TYPE }
