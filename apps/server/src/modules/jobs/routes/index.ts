import { Routes } from 'interfaces/index.js'
import { createJob, getJobs } from '../controllers/JobController.js'
import { CREATE_JOB_SCHEMA } from '../schemas/index.js'

export const getJobsRoutes = (): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/jobs',
      handler: getJobs,
    },
    {
      method: 'POST',
      url: '/jobs',
      handler: createJob,
      schema: {
        body: CREATE_JOB_SCHEMA,
      },
    },
  ],
})
