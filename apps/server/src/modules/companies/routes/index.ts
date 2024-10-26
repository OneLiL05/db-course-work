import { Routes } from '@/interfaces/index.js'
import { AppInstanse } from '@/types/index.js'
import {
  CREATE_COMPANY_SCHEMA,
  CREATE_JOB_SCHEMA,
  GET_BY_ID_SCHEMA,
} from '@skill-swap/shared'
import {
  createCompany,
  createCompanyJob,
  getCompanies,
  getCompany,
  getCompanyJobs,
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
      method: 'GET',
      url: '/companies/:id/jobs',
      handler: getCompanyJobs,
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
      method: 'POST',
      url: '/companies/:id/jobs',
      handler: createCompanyJob,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: CREATE_JOB_SCHEMA,
      },
      preHandler: [app.authentificate, app.isEmployer],
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