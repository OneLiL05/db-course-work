import { z } from 'zod'

const CREATE_CITY_SCHEMA = z.object({
  name: z.string().min(4).max(128),
})

type CreateCity = z.infer<typeof CREATE_CITY_SCHEMA>

export { CREATE_CITY_SCHEMA }
export type { CreateCity }
