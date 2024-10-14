import { z } from 'zod'

const CITY_MODEL = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
})

type City = z.infer<typeof CITY_MODEL>

export { CITY_MODEL }
export type { City }
