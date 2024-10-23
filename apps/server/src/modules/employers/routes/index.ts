import { AppInstanse } from '@/types/index.js'
import {
  createEmployer,
  getEmployer,
  getEmployers,
} from '../controllers/EmployerController.js'
import { CREATE_EMPLOYER_SCHEMA } from '../schemas/index.js'
import { Routes } from '@/interfaces/index.js'
import { GET_BY_ID_SCHEMA } from '@skill-swap/shared'

export const getEmployersRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/employers',
      handler: getEmployers,
    },
    {
      method: 'GET',
      url: '/employers/:id',
      handler: getEmployer,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/employers',
      handler: createEmployer,
      schema: {
        body: CREATE_EMPLOYER_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
    {
      method: 'PUT',
      url: '/employers/:id',
      handler: createEmployer,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: CREATE_EMPLOYER_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
  ],
})
