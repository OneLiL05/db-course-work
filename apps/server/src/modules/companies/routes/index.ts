import { Routes } from '@/interfaces/index.js'
import { AppInstanse } from '@/types/index.js'
import { CREATE_COMPANY_SCHEMA, GET_BY_ID_SCHEMA } from '@skill-swap/shared'
import {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
} from '../controllers/CompanyController.js'

export const getCompaniesRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/companies',
      handler: getCompanies,
    },
    {
      method: 'GET',
      url: '/companies/:id',
      handler: getCompany,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/companies',
      handler: createCompany,
      schema: {
        body: CREATE_COMPANY_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
    {
      method: 'PUT',
      url: '/companies/:id',
      handler: updateCompany,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: CREATE_COMPANY_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
  ],
})
