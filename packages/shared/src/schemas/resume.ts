import { z } from 'zod'

const RESUME_SCHEMA = z.object({
  id: z.number(),
  name: z.string(),
  path: z.string(),
  fileId: z.string(),
  userId: z.number(),
})

type Resume = z.infer<typeof RESUME_SCHEMA>

export { RESUME_SCHEMA }
export type { Resume }
