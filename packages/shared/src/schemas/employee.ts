import { z } from 'zod'
import { SALARY_CURRENCY_SCHEMA, SALARY_PERIOD_SCHEMA } from './job.js'

const EMPLOYEE_SCHEMA = z.object({
  id: z.number(),
  employedAt: z.date(),
  firedAt: z.date().nullable(),
  jobId: z.number(),
  userId: z.number(),
})

type Employee = z.infer<typeof EMPLOYEE_SCHEMA>

const COMPANY_EMPLOYEE_SCHEMA = EMPLOYEE_SCHEMA.extend({
  employeeName: z.string(),
  employeeJob: z.string(),
  salaryAmount: z.string(),
  salaryCurrency: SALARY_CURRENCY_SCHEMA,
  salaryPeriod: SALARY_PERIOD_SCHEMA,
})

type CompanyEmployee = z.infer<typeof COMPANY_EMPLOYEE_SCHEMA>

const CREATE_EMPLOYEE_SCHEMA = z.object({
  jobId: z.number(),
  userId: z.number(),
})

type CREATE_EMPLOYEE_SCHEMA_TYPE = z.infer<typeof CREATE_EMPLOYEE_SCHEMA>

export { EMPLOYEE_SCHEMA, CREATE_EMPLOYEE_SCHEMA, COMPANY_EMPLOYEE_SCHEMA }
export type { Employee, CompanyEmployee, CREATE_EMPLOYEE_SCHEMA_TYPE }
