import { z } from 'zod'
import { BASE_MODEL } from './common.js'
import { ID_SCHEMA } from './index.js'

const COMPANY_ROLES = z.enum(['owner', 'admin'])

const COMPANY_MODEL = BASE_MODEL.extend({
  description: z.string(),
  img: z.string(),
  isVerified: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
})

type Company = z.infer<typeof COMPANY_MODEL>

const COMPANY_ADMIN_MODEL = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  role: COMPANY_ROLES,
})

type CompanyAdmin = z.infer<typeof COMPANY_ADMIN_MODEL>

const CREATE_COMPANY_SCHEMA = z.object({
  name: z.string().min(4).max(128),
  description: z.string(),
})

type CREATE_COMPANY_SCHEMA_TYPE = z.infer<typeof CREATE_COMPANY_SCHEMA>

const CREATE_COMPANY_ADMIN_SCHEMA = z.object({
  userId: ID_SCHEMA,
  role: z.enum(['owner', 'admin']),
})

type CREATE_COMPANY_ADMIN_SCHEMA_TYPE = z.infer<
  typeof CREATE_COMPANY_ADMIN_SCHEMA
>

export {
  COMPANY_MODEL,
  CREATE_COMPANY_SCHEMA,
  CREATE_COMPANY_ADMIN_SCHEMA,
  COMPANY_ROLES,
  COMPANY_ADMIN_MODEL,
}
export type {
  Company,
  CompanyAdmin,
  CREATE_COMPANY_SCHEMA_TYPE,
  CREATE_COMPANY_ADMIN_SCHEMA_TYPE,
}
