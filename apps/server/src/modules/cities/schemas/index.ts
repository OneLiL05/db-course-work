import { BASE_MODEL } from 'schemas/models/common.js'
import { z } from 'zod'

const CREATE_CITY_SCHEMA = BASE_MODEL.pick({ name: true })

type CreateCity = z.infer<typeof CREATE_CITY_SCHEMA>

export { CREATE_CITY_SCHEMA }
export type { CreateCity }
