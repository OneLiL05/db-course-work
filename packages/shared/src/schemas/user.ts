import { z } from 'zod'

const USER_SCHEMA = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  username: z.string().min(6).max(64),
  img: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  roles: z.enum(['admin', 'employer', 'user']).array(),
})

type User = z.infer<typeof USER_SCHEMA>

const CREATE_USER_SCHEMA = USER_SCHEMA.pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  img: true,
})

type CREATE_USER_SCHEMA_TYPE = z.infer<typeof CREATE_USER_SCHEMA>

const CREATED_USER_SCHEMA = USER_SCHEMA.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
  roles: true,
})

type CreatedUser = z.infer<typeof CREATED_USER_SCHEMA>

export { USER_SCHEMA, CREATE_USER_SCHEMA, CREATED_USER_SCHEMA }
export type { User, CREATE_USER_SCHEMA_TYPE, CreatedUser }
