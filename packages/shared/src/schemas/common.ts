import { z } from 'zod'

const BASE_MODEL = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(4).max(128),
})

const ORDER_SCHEMA = z.enum(['asc', 'desc'])

const BASE_MODEL_QUERY = z.object({
  order: ORDER_SCHEMA,
  sortBy: z.enum(['id', 'name']),
})

type BASE_MODEL_QUERY_TYPE = z.infer<typeof BASE_MODEL_QUERY>

export { BASE_MODEL, ORDER_SCHEMA, BASE_MODEL_QUERY }
export type { BASE_MODEL_QUERY_TYPE }
