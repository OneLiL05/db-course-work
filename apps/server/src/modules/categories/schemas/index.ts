import { BASE_MODEL } from '@/schemas/models/common.js'
import { z } from 'zod'

const CREATE_CATEGORY_SCHEMA = BASE_MODEL.pick({ name: true })

type CreateCategory = z.infer<typeof CREATE_CATEGORY_SCHEMA>

export { CREATE_CATEGORY_SCHEMA }
export type { CreateCategory }
