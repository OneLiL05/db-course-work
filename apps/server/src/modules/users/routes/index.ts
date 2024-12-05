import { Routes } from '@/interfaces/index.js'
import {
  getUser,
  getUserCompanies,
  getUserResumes,
} from '../controllers/UserController.js'
import { GET_BY_ID_SCHEMA } from '@skill-swap/shared'
import { AppInstanse } from '@/types/index.js'

export const getUsersRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/users/:id',
      handler: getUser,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
    {
      method: 'GET',
      url: '/users/:id/companies',
      handler: getUserCompanies,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
    {
      method: 'GET',
      url: '/users/:id/resumes',
      handler: getUserResumes,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
  ],
})
