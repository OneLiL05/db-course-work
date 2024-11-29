import { Routes } from '@/interfaces/index.js'
import {
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from '../controllers/JobController.js'
import { GET_BY_ID_SCHEMA, UPDATE_JOB_SCHEMA } from '@skill-swap/shared'
import { AppInstanse } from '@/types/index.js'

export const getJobsRoutes = (app: AppInstanse): Routes => ({
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
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
    {
      method: 'PUT',
      url: '/jobs/:id',
      handler: updateJob,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: UPDATE_JOB_SCHEMA,
      },
      preHandler: [app.authentificate, app.nonUser],
    },
    {
      method: 'DELETE',
      url: '/jobs/:id',
      handler: deleteJob,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
  ],
})
