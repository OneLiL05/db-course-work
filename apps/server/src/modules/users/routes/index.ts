import { Routes } from 'interfaces/index.js'
import { getUser } from '../controllers/UserController.js'
import { GET_BY_ID_SCHEMA } from 'schemas/common.js'

export const getUsersRoutes = (): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/users/:id',
      handler: getUser,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
  ],
})
