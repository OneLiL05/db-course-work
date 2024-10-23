import { EMPLOYER_MODEL } from '@/schemas/models/employer.js'
import { z } from 'zod'

const CREATE_EMPLOYER_SCHEMA = EMPLOYER_MODEL.pick({
  name: true,
  description: true,
  isVerified: true,
})

type CreateEmployer = z.infer<typeof CREATE_EMPLOYER_SCHEMA>

export { CREATE_EMPLOYER_SCHEMA }
export type { CreateEmployer }
