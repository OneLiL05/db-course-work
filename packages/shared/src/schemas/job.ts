import { z } from 'zod'
import { BASE_MODEL } from './common.js'
import { CREATE_JOB_SKILL_SCHEMA } from './skill.js'

const SALARY_CURRENCY_SCHEMA = z.enum(['USD', 'UAH', 'EUR'])

type SalaryCurrency = z.infer<typeof SALARY_CURRENCY_SCHEMA>

const SALARY_PERIOD_SCHEMA = z.enum(['one-time', 'weekly', 'monthly', 'yearly'])

type SalaryPeriod = z.infer<typeof SALARY_PERIOD_SCHEMA>

const JOB_SALARY_SCHEMA = z.object({
  amount: z.number().min(100).max(9999999999),
  currency: SALARY_CURRENCY_SCHEMA,
  period: SALARY_PERIOD_SCHEMA.default('monthly'),
})

const JOB_SKILL_SCHEMA = z.object({
  id: z.number(),
  name: z.string(),
  skillId: z.number(),
  level: z.string(),
  skillLevelId: z.number(),
})

type JobSkill = z.infer<typeof JOB_SKILL_SCHEMA>

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
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  city: z.object({
    id: z.number(),
    name: z.string(),
  }),
  company: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    img: z.string(),
    isVerified: z.boolean(),
  }),
  position: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

type Job = z.infer<typeof JOB_SCHEMA>

const JOBS_AVG_SALARY_QUERY_SCHEMA = z.object({
  currency: SALARY_CURRENCY_SCHEMA.optional().default('USD'),
  period: SALARY_PERIOD_SCHEMA.optional().default('monthly'),
})

type JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE = z.infer<
  typeof JOBS_AVG_SALARY_QUERY_SCHEMA
>

const JOB_AVG_SALARY_SCHEMA = z.object({
  avg: z.number(),
  currency: SALARY_CURRENCY_SCHEMA,
  period: SALARY_PERIOD_SCHEMA,
})

type AvgSalary = z.infer<typeof JOB_AVG_SALARY_SCHEMA>

const CREATE_JOB_SCHEMA = JOB_SCHEMA.omit({
  companyId: true,
  id: true,
  updatedAt: true,
  createdAt: true,
  isActive: true,
  isHidden: true,
  skills: true,
  category: true,
  city: true,
  company: true,
  position: true,
}).extend({
  skills: CREATE_JOB_SKILL_SCHEMA.array(),
})

type CREATE_JOB_SCHEMA_TYPE = z.infer<typeof CREATE_JOB_SCHEMA>

const UPDATE_JOB_SCHEMA = JOB_SCHEMA.omit({
  companyId: true,
  id: true,
  updatedAt: true,
  createdAt: true,
  isActive: true,
  isHidden: true,
  skills: true,
  category: true,
  city: true,
  company: true,
  position: true,
}).extend({
  addSkills: CREATE_JOB_SKILL_SCHEMA.array(),
  removeSkills: z.object({ id: z.number() }).array(),
})

type UPDATE_JOB_SCHEMA_TYPE = z.infer<typeof UPDATE_JOB_SCHEMA>

export type {
  Job,
  CREATE_JOB_SCHEMA_TYPE,
  SalaryCurrency,
  SalaryPeriod,
  JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE,
  AvgSalary,
  UPDATE_JOB_SCHEMA_TYPE,
  JobSkill,
}
export {
  JOB_SCHEMA,
  CREATE_JOB_SCHEMA,
  SALARY_CURRENCY_SCHEMA,
  SALARY_PERIOD_SCHEMA,
  JOBS_AVG_SALARY_QUERY_SCHEMA,
  JOB_AVG_SALARY_SCHEMA,
  UPDATE_JOB_SCHEMA,
}
