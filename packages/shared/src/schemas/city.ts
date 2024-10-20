import { z } from 'zod'
import { BASE_MODEL } from './common.js'

const CITY_MODEL = BASE_MODEL

type City = z.infer<typeof CITY_MODEL>

export { CITY_MODEL }
export type { City }
