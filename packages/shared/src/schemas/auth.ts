import { z } from 'zod'

const LOGIN_SCHEMA = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type LOGIN_SCHEMA_TYPE = z.infer<typeof LOGIN_SCHEMA>

export { LOGIN_SCHEMA }
export type { LOGIN_SCHEMA_TYPE }
