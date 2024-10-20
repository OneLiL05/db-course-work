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
  areStudentsAllowed: z.boolean(),
  areRetireesAllowed: z.boolean(),
  areDisabledAllowed: z.boolean(),
  isActive: z.boolean(),
  isHidden: z.boolean(),
  categoryId: z.number(),
  positionId: z.number(),
  employerId: z.number(),
  cityId: z.number(),
  salary: JOB_SALARY_SCHEMA,
  skills: JOB_SKILL_SCHEMA.array(),
})

type Job = z.infer<typeof JOB_SCHEMA>

export type { Job }
export { JOB_SCHEMA }
