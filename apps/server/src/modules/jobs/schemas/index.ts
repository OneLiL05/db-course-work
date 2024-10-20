import { JOB_SCHEMA } from 'schemas/models/job.js'
import { z } from 'zod'

const CREATE_JOB_SCHEMA = JOB_SCHEMA.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
  isHidden: true,
  skills: true,
})

type CreateJob = z.infer<typeof CREATE_JOB_SCHEMA>

export { CREATE_JOB_SCHEMA }
export type { CreateJob }
