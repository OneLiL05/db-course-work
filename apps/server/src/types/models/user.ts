import { USER_SCHEMA } from 'schemas/models/user.js'
import { z } from 'zod'

type User = z.infer<typeof USER_SCHEMA>

type UserWithout<T extends keyof User> = Omit<User, T>

export type { User, UserWithout }
