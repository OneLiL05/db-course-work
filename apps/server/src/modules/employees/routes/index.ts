import { Routes } from '@/interfaces/index.js'
import { AppInstanse } from '@/types/index.js'
import {
  createEmployee,
  deleteEmployee,
} from '../controllers/EmployeeController.js'
import { CREATE_EMPLOYEE_SCHEMA, GET_BY_ID_SCHEMA } from '@skill-swap/shared'

export const getEmployeesRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'POST',
      url: '/employees',
      handler: createEmployee,
      schema: {
        body: CREATE_EMPLOYEE_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
    {
      method: 'DELETE',
      url: '/employees/:id',
      handler: deleteEmployee,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate],
    },
  ],
})
