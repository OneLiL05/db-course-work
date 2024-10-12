import { Routes } from 'interfaces/index.js'
import { login, logout, signup } from '../controllers/AuthController.js'
import { LOGIN_SCHEMA } from '../schema/index.js'
import { AppInstanse } from 'types/index.js'
import { CREATE_USER_SCHEMA } from 'modules/users/schemas/index.js'

export const getAuthRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'POST',
      url: '/login',
      handler: login,
      schema: {
        body: LOGIN_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/signup',
      handler: signup,
      schema: {
        body: CREATE_USER_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/logout',
      handler: logout,
      preHandler: [app.authentificate],
    },
  ],
})
