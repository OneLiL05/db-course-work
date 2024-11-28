import { z } from 'zod'
import { BASE_MODEL } from './common.js'
import { ID_SCHEMA } from './index.js'

const CITY_MODEL = BASE_MODEL

type City = z.infer<typeof CITY_MODEL>

const CITY_MODEL_WITH_COUNT = CITY_MODEL.extend({
  count: z.number(),
})

type CityWithCount = z.infer<typeof CITY_MODEL_WITH_COUNT>

const CREATE_CITY_SCHEMA = z.object({
  name: z.string({ required_error: 'City name is required' }).min(4).max(128),
})

type CREATE_CITY_SCHEMA_TYPE = z.infer<typeof CREATE_CITY_SCHEMA>

const UPDATE_CITY_SCHEMA = z.object({
  id: ID_SCHEMA,
  name: z.string({ required_error: 'City name is required' }).min(4).max(128),
})

type UPDATE_CITY_SCHEMA_TYPE = z.infer<typeof UPDATE_CITY_SCHEMA>

export {
  CITY_MODEL,
  CREATE_CITY_SCHEMA,
  UPDATE_CITY_SCHEMA,
  CITY_MODEL_WITH_COUNT,
}
export type {
  City,
  CREATE_CITY_SCHEMA_TYPE,
  UPDATE_CITY_SCHEMA_TYPE,
  CityWithCount,
}
