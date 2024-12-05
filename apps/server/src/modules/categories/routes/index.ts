import { Routes } from '@/interfaces/index.js'
import { AppInstanse } from '@/types/index.js'
import {
  BASE_MODEL_QUERY,
  CATEGORY_SCHEMA_WITH_COUNT,
  CREATE_CATEGORY_SCHEMA,
  GET_BY_ID_SCHEMA,
  JOB_FILTERS_SCHEMA,
} from '@skill-swap/shared'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesWithJobsCount,
  getCategory,
  getCategoryJobs,
  getCategoryJobsAvgSalary,
  updateCategory,
} from '../controllers/CategoryController.js'

export const getCategoriesRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/categories',
      handler: getCategories,
      schema: {
        querystring: BASE_MODEL_QUERY,
      },
    },
    {
      method: 'GET',
      url: '/categories/jobs/count',
      handler: getCategoriesWithJobsCount,
      schema: {
        querystring: BASE_MODEL_QUERY,
        response: {
          200: CATEGORY_SCHEMA_WITH_COUNT.array(),
        },
      },
    },
    {
      method: 'GET',
      url: '/categories/:id',
      handler: getCategory,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
    {
      method: 'GET',
      url: '/categories/:id/jobs/avg-salary',
      handler: getCategoryJobsAvgSalary,
      schema: {
        params: GET_BY_ID_SCHEMA,
        // querysting: JOBS_AVG_SALARY_QUERY_SCHEMA,
      },
    },
    {
      method: 'GET',
      url: '/categories/:id/jobs',
      handler: getCategoryJobs,
      schema: {
        params: GET_BY_ID_SCHEMA,
        querystring: JOB_FILTERS_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/categories',
      handler: createCategory,
      schema: {
        body: CREATE_CATEGORY_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'PUT',
      url: '/categories/:id',
      handler: updateCategory,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: CREATE_CATEGORY_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'DELETE',
      url: '/categories/:id',
      handler: deleteCategory,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
  ],
})
