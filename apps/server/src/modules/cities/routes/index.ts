import { Routes } from 'interfaces/index.js'
import {
  createCity,
  deleteCity,
  getCities,
  updateCity,
} from '../controllers/CityController.js'
import { CITY_MODEL } from 'schemas/models/city.js'
import { CREATE_CITY_SCHEMA } from '../schemas/index.js'
import { GET_BY_ID_SCHEMA, MESSAGE_SCHEMA } from 'schemas/common.js'
import { AppInstanse } from 'types/index.js'

export const getCitiesRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/cities',
      handler: getCities,
      schema: {
        response: {
          200: CITY_MODEL.array(),
        },
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
