import { z } from 'zod'
import { BASE_MODEL } from './common.js'

const JOB_SALARY_SCHEMA = z.object({
  amount: z.number().min(100),
  currency: z.enum(['USD', 'UAH', 'EUR']),
})

const JOB_SKILL_SCHEMA = z.object({
  name: z.string(),
  level: z.string(),
})

const JOB_SCHEMA = BASE_MODEL.extend({
  description: z.string().min(15).max(256),
  isCvRequired: z.boolean(),
  isFulltime: z.boolean(),
  isRemote: z.boolean(),
  areStudentsAllowed: z.boolean(),
  isActive: z.boolean(),
  isHidden: z.boolean(),
  categoryId: z.coerce.number(),
  positionId: z.coerce.number(),
  companyId: z.coerce.number(),
  cityId: z.coerce.number(),
  salary: JOB_SALARY_SCHEMA,
  skills: JOB_SKILL_SCHEMA.array(),
})

type Job = z.infer<typeof JOB_SCHEMA>

const CREATE_JOB_SCHEMA = JOB_SCHEMA.omit({
  companyId: true,
  id: true,
  updatedAt: true,
  createdAt: true,
  isActive: true,
  isHidden: true,
  skills: true,
})

type CREATE_JOB_SCHEMA_TYPE = z.infer<typeof CREATE_JOB_SCHEMA>

export type { Job, CREATE_JOB_SCHEMA_TYPE }
export { JOB_SCHEMA, CREATE_JOB_SCHEMA }
