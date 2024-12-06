import { z } from 'zod'

const EMPLOYEE_SCHEMA = z.object({
  id: z.number(),
  employedAt: z.date(),
  firedAt: z.date().nullable(),
  jobId: z.number(),
  userId: z.number(),
})

type Employee = z.infer<typeof EMPLOYEE_SCHEMA>

const CREATE_EMPLOYEE_SCHEMA = z.object({
  jobId: z.number(),
  userId: z.number(),
})

type CREATE_EMPLOYEE_SCHEMA_TYPE = z.infer<typeof CREATE_EMPLOYEE_SCHEMA>

export { EMPLOYEE_SCHEMA, CREATE_EMPLOYEE_SCHEMA }
export type { Employee, CREATE_EMPLOYEE_SCHEMA_TYPE }
