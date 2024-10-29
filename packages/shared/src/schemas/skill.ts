import { z } from 'zod'
import { BASE_MODEL } from './common.js'
import { ID_SCHEMA } from './index.js'

const SKILL_SCHEMA = BASE_MODEL

const SKILL_NAME_SCHEMA = z
  .string({ required_error: 'Skill name is required' })
  .min(2)
  .max(128)

type Skill = z.infer<typeof SKILL_SCHEMA>

const CREATE_SKILL_SCHEMA = z.object({
  name: SKILL_NAME_SCHEMA,
})

type CREATE_SKILL_SCHEMA_TYPE = z.infer<typeof CREATE_SKILL_SCHEMA>

const UPDATE_SKILL_SCHEMA = z.object({
  id: ID_SCHEMA,
  name: SKILL_NAME_SCHEMA,
})

type UPDATE_SKILL_SCHEMA_TYPE = z.infer<typeof UPDATE_SKILL_SCHEMA>

export type { Skill, CREATE_SKILL_SCHEMA_TYPE, UPDATE_SKILL_SCHEMA_TYPE }
export { SKILL_SCHEMA, CREATE_SKILL_SCHEMA, UPDATE_SKILL_SCHEMA }
