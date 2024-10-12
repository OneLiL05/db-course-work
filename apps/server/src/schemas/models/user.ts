import { z } from 'zod'

export const USER_SCHEMA = z.object({
  id: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  username: z.string().min(6).max(64),
  img: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  employer_id: z.number().optional(),
  roles: z.enum(['admin', 'employer', 'user']).array(),
})
