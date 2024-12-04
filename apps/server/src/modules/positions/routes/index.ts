import { AppInstanse } from '@/types/index.js'
import {
  createPosition,
  deletePosition,
  getPosition,
  getPositionJobs,
  getPositions,
  getPositionsWithJobsCount,
  updatePosition,
} from '../controllers/PositionController.js'
import { Routes } from '@/interfaces/index.js'
import {
  BASE_MODEL_QUERY,
  CREATE_POSITION_SCHEMA,
  GET_BY_ID_SCHEMA,
  JOB_FILTERS_SCHEMA,
  POSITION_WITH_COUNT_SCHEMA,
} from '@skill-swap/shared'

export const getPositionsRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/positions',
      handler: getPositions,
      schema: {
        querystring: BASE_MODEL_QUERY,
      },
    },
    {
      method: 'GET',
      url: '/positions/jobs/count',
      handler: getPositionsWithJobsCount,
      schema: {
        querystring: BASE_MODEL_QUERY,
        response: {
          200: POSITION_WITH_COUNT_SCHEMA.array(),
        },
      },
    },
    {
      method: 'GET',
      url: '/positions/:id',
      handler: getPosition,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
    {
      method: 'GET',
      url: '/positions/:id/jobs',
      handler: getPositionJobs,
      schema: {
        params: GET_BY_ID_SCHEMA,
        querystring: JOB_FILTERS_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/positions',
      handler: createPosition,
      schema: {
        body: CREATE_POSITION_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'PUT',
      url: '/positions/:id',
      handler: updatePosition,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: CREATE_POSITION_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'DELETE',
      url: '/positions/:id',
      handler: deletePosition,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
  ],
})
