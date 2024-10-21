import { z } from 'zod'
import { BASE_MODEL } from './common.js'

const CITY_MODEL = BASE_MODEL

type City = z.infer<typeof CITY_MODEL>

const CREATE_CITY_SCHEMA = z.object({
  name: z.string({ required_error: 'City name is required' }).min(4).max(128),
})

type CREATE_CITY_SCHEMA_TYPE = z.infer<typeof CREATE_CITY_SCHEMA>

export { CITY_MODEL, CREATE_CITY_SCHEMA }
export type { City, CREATE_CITY_SCHEMA_TYPE }
