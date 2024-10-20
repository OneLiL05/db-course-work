import { z } from 'zod'

const BASE_MODEL = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(4).max(128),
})

export { BASE_MODEL }
