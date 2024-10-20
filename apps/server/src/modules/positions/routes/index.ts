import { Routes } from 'interfaces/index.js'
import {
  createPosition,
  deletePosition,
  getPosition,
  getPositions,
  updatePosition,
} from '../controllers/PositionController.js'
import { CREATE_POSITION_SCHEMA } from '../schemas/index.js'
import { AppInstanse } from 'types/index.js'
import { GET_BY_ID_SCHEMA } from 'schemas/common.js'

export const getPositionsRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/positions',
      handler: getPositions,
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
      method: 'POST',
      url: '/positions',
      handler: createPosition,
      schema: {
        body: CREATE_POSITION_SCHEMA,
      },
      // preHandler: [app.authentificate, app.isAdmin],
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
