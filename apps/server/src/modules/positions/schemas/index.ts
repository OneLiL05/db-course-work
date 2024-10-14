import { BASE_MODEL } from 'schemas/models/common.js'
import { z } from 'zod'

const CREATE_POSITION_SCHEMA = BASE_MODEL.pick({ name: true })

type CreatePosition = z.infer<typeof CREATE_POSITION_SCHEMA>

export { CREATE_POSITION_SCHEMA }
export type { CreatePosition }
