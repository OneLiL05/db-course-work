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
  employerId: z.number().optional(),
  roles: z.enum(['admin', 'employer', 'user']).array(),
})

type User = z.infer<typeof USER_SCHEMA>

export { USER_SCHEMA }
export type { User }
