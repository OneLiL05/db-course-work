import { Routes } from '@/interfaces/index.js'
import { getJob, getJobs } from '../controllers/JobController.js'

export const getJobsRoutes = (): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/jobs',
      handler: getJobs,
    },
    {
      method: 'GET',
      url: '/jobs/:id',
      handler: getJob,
    },
  ],
})
