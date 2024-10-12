import { USER_SCHEMA } from 'schemas/models/user.js'
import { z } from 'zod'

const CREATE_USER_SCHEMA = USER_SCHEMA.pick({
  username: true,
  email: true,
  password: true,
  first_name: true,
  last_name: true,
  img: true,
})

type CreateUser = z.infer<typeof CREATE_USER_SCHEMA>

export { CREATE_USER_SCHEMA }
export type { CreateUser }
