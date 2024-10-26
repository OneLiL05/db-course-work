import { Routes } from '@/interfaces/index.js'
import { getJobs } from '../controllers/JobController.js'

export const getJobsRoutes = (): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/jobs',
      handler: getJobs,
    },
  ],
})
