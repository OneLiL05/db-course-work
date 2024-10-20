import { z } from 'zod'
import { BASE_MODEL } from './common.js'

const EMPLOYER_MODEL = BASE_MODEL.extend({
  description: z.string(),
  img: z.string(),
  isVerified: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
})

type Employer = z.infer<typeof EMPLOYER_MODEL>

export { EMPLOYER_MODEL }
export type { Employer }
