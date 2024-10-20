import { z } from 'zod'
import { BASE_MODEL } from './common.js'

const POSITION_SCHEMA = BASE_MODEL

type Position = z.infer<typeof POSITION_SCHEMA>

export { POSITION_SCHEMA }
export type { Position }
