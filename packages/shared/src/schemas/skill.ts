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

const SKILL_LEVEL_SCHEMA = z.object({
  id: z.number(),
  name: z.string(),
})

type SkillLevel = z.infer<typeof SKILL_LEVEL_SCHEMA>

const CREATE_JOB_SKILL_SCHEMA = z.object({
  skillId: z.coerce.number().min(1),
  skillLevelId: z.coerce.number().min(1),
})

type CREATE_JOB_SKILL_SCHEMA_TYPE = z.infer<typeof CREATE_JOB_SKILL_SCHEMA>

export type {
  Skill,
  CREATE_SKILL_SCHEMA_TYPE,
  UPDATE_SKILL_SCHEMA_TYPE,
  SkillLevel,
  CREATE_JOB_SKILL_SCHEMA_TYPE,
}
export {
  SKILL_SCHEMA,
  CREATE_SKILL_SCHEMA,
  UPDATE_SKILL_SCHEMA,
  SKILL_LEVEL_SCHEMA,
  CREATE_JOB_SKILL_SCHEMA,
}
