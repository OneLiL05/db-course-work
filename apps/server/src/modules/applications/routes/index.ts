import { Routes } from '@/interfaces/index.js'
import { AppInstanse } from '@/types/index.js'
import {
  CREATE_APPLICATION_SCHEMA,
  GET_BY_ID_SCHEMA,
  UPDATE_APPLICATION_SCHEMA,
} from '@skill-swap/shared'
import {
  createApplication,
  deleteApplication,
  getApplicationStages,
  updateApplication,
} from '../controllers/ApplicationController.js'

export const getApplicationsRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/applications/stages',
      handler: getApplicationStages,
    },
    {
      method: 'POST',
      url: '/applications',
      handler: createApplication,
      schema: {
        body: CREATE_APPLICATION_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
    {
      method: 'PUT',
      url: '/applications/:id',
      handler: updateApplication,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: UPDATE_APPLICATION_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
    {
      method: 'DELETE',
      url: '/applications/:id',
      handler: deleteApplication,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
  ],
})
