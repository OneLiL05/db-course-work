import { z } from 'zod'
import { BASE_MODEL } from './common.js'

const CATEGORY_MODEL = BASE_MODEL

type Category = z.infer<typeof CATEGORY_MODEL>

export { CATEGORY_MODEL }
export type { Category }
