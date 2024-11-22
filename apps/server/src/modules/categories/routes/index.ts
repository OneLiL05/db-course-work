import { Routes } from '@/interfaces/index.js'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/CategoryController.js'
import { AppInstanse } from '@/types/index.js'
import {
  BASE_MODEL_QUERY,
  CREATE_CATEGORY_SCHEMA,
  GET_BY_ID_SCHEMA,
} from '@skill-swap/shared'

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
      url: '/categories/:id',
      handler: getCategory,
      schema: {
        params: GET_BY_ID_SCHEMA,
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
