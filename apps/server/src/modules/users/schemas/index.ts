import { USER_SCHEMA } from '@skill-swap/shared'
import { z } from 'zod'

const CREATE_USER_SCHEMA = USER_SCHEMA.pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  img: true,
})

type CreateUser = z.infer<typeof CREATE_USER_SCHEMA>

export { CREATE_USER_SCHEMA }
export type { CreateUser }
