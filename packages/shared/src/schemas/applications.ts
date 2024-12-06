import { z } from 'zod'

const APPLICATION_STAGES_SCHEMA = z.enum([
  'New',
  'HR Review',
  'Interview',
  'Offer',
  'Declined',
  'All',
])

type ApplicationStages = z.infer<typeof APPLICATION_STAGES_SCHEMA>

const APPLICATION_STAGE_SCHEMA = z.object({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: APPLICATION_STAGES_SCHEMA,
})

type ApplicationStage = z.infer<typeof APPLICATION_STAGE_SCHEMA>

const APPLICATION_SCHEMA = z.object({
  id: z.number(),
  appliedAt: z.date(),
  coverLetter: z.string(),
  stageId: z.number(),
  jobId: z.number(),
  resumeId: z.number(),
})

type Application = z.infer<typeof APPLICATION_SCHEMA>

const USER_APPLICATION_SCHEMA = APPLICATION_SCHEMA.extend({
  stageName: APPLICATION_STAGES_SCHEMA,
  companyName: z.string(),
  companyId: z.number(),
  resumePath: z.string(),
  jobName: z.string(),
  jobId: z.number(),
})

type UserApplication = z.infer<typeof USER_APPLICATION_SCHEMA>

const COMPANY_APPLICATION_SCHEMA = APPLICATION_SCHEMA.extend({
  stageName: APPLICATION_STAGES_SCHEMA,
  applierName: z.string(),
  resumePath: z.string(),
  jobName: z.string(),
  jobId: z.number(),
  applierId: z.number(),
})

type CompanyApplication = z.infer<typeof COMPANY_APPLICATION_SCHEMA>

const CREATE_APPLICATION_SCHEMA = z.object({
  coverLetter: z.string().min(15),
  resumeId: z.number(),
  jobId: z.number(),
})

type CREATE_APPLICATION_SCHEMA_TYPE = z.infer<typeof CREATE_APPLICATION_SCHEMA>

const UPDATE_APPLICATION_SCHEMA = z.object({
  stageId: z.number(),
})

type UPDATE_APPLICATION_SCHEMA_TYPE = z.infer<typeof UPDATE_APPLICATION_SCHEMA>

const APPLICATION_FILTERS_SCHEMA = z.object({
  stage: APPLICATION_STAGES_SCHEMA.optional(),
  close: z.boolean().default(false),
})

type APPLICATION_FILTERS_SCHEMA_TYPE = z.infer<
  typeof APPLICATION_FILTERS_SCHEMA
>

export {
  APPLICATION_SCHEMA,
  APPLICATION_STAGES_SCHEMA,
  APPLICATION_STAGE_SCHEMA,
  CREATE_APPLICATION_SCHEMA,
  UPDATE_APPLICATION_SCHEMA,
  COMPANY_APPLICATION_SCHEMA,
  USER_APPLICATION_SCHEMA,
  APPLICATION_FILTERS_SCHEMA,
}
export type {
  Application,
  ApplicationStage,
  ApplicationStages,
  CompanyApplication,
  UserApplication,
  CREATE_APPLICATION_SCHEMA_TYPE,
  UPDATE_APPLICATION_SCHEMA_TYPE,
  APPLICATION_FILTERS_SCHEMA_TYPE,
}
