import { AppInstanse } from '@/types/index.js'
import {
  createCity,
  deleteCity,
  getCities,
  getCitiesWithJobsCount,
  getCity,
  getCityJobs,
  getCityJobsAvgSalary,
  updateCity,
} from '../controllers/CityController.js'
import {
  BASE_MODEL_QUERY,
  CITY_MODEL,
  CITY_MODEL_WITH_COUNT,
  CREATE_CITY_SCHEMA,
  GET_BY_ID_SCHEMA,
  JOBS_AVG_SALARY_QUERY_SCHEMA,
  JOB_FILTERS_SCHEMA,
  MESSAGE_SCHEMA,
} from '@skill-swap/shared'
import { Routes } from '@/interfaces/index.js'

export const getCitiesRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/cities',
      handler: getCities,
      schema: {
        querystring: BASE_MODEL_QUERY,
        response: {
          200: CITY_MODEL.array(),
        },
      },
    },
    {
      method: 'GET',
      url: '/cities/:id',
      handler: getCity,
      schema: {
        params: GET_BY_ID_SCHEMA,
        response: {
          200: CITY_MODEL,
        },
      },
    },
    {
      method: 'GET',
      url: '/cities/jobs/count',
      handler: getCitiesWithJobsCount,
      schema: {
        querystring: BASE_MODEL_QUERY,
        response: {
          200: CITY_MODEL_WITH_COUNT.array(),
        },
      },
    },
    {
      method: 'GET',
      url: '/cities/:id/jobs',
      handler: getCityJobs,
      schema: {
        params: GET_BY_ID_SCHEMA,
        querystring: JOB_FILTERS_SCHEMA,
      },
    },
    {
      method: 'GET',
      url: '/cities/:id/jobs/avg-salary',
      handler: getCityJobsAvgSalary,
      schema: {
        params: GET_BY_ID_SCHEMA,
        querystring: JOBS_AVG_SALARY_QUERY_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/cities',
      handler: createCity,
      schema: {
        body: CREATE_CITY_SCHEMA,
        response: {
          201: CITY_MODEL,
          500: MESSAGE_SCHEMA,
        },
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'DELETE',
      url: '/cities/:id',
      handler: deleteCity,
      schema: {
        params: GET_BY_ID_SCHEMA,
        responce: {
          200: CITY_MODEL,
          404: MESSAGE_SCHEMA,
          500: MESSAGE_SCHEMA,
        },
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'PUT',
      url: '/cities/:id',
      handler: updateCity,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: CREATE_CITY_SCHEMA,
        responce: {
          200: CITY_MODEL,
          404: MESSAGE_SCHEMA,
          500: MESSAGE_SCHEMA,
        },
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
  ],
})
