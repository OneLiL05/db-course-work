import { getAuthRoutes } from './auth/routes/index.js'
import { getCategoriesRoutes } from './categories/routes/index.js'
import { getCitiesRoutes } from './cities/routes/index.js'
import { getBaseRoutes } from './getBaseRoutes.js'
import { getEmployersRoutes } from './employers/routes/index.js'
import { getPositionsRoutes } from './positions/routes/index.js'
import { getJobsRoutes } from './jobs/routes/index.js'
import { AppInstanse } from '@/types/index.js'
import { Routes } from '@/interfaces/index.js'

export const getRoutes = (app: AppInstanse): Routes => {
  const { routes: baseRoutes } = getBaseRoutes()
  const { routes: authRoutes } = getAuthRoutes(app)
  const { routes: citiesRoutes } = getCitiesRoutes(app)
  const { routes: categoriesRoutes } = getCategoriesRoutes(app)
  const { routes: employersRoutes } = getEmployersRoutes(app)
  const { routes: positionsRoutes } = getPositionsRoutes(app)
  const { routes: jobsRoutes } = getJobsRoutes()

  return {
    routes: [
      ...baseRoutes,
      ...authRoutes,
      ...citiesRoutes,
      ...categoriesRoutes,
      ...employersRoutes,
      ...positionsRoutes,
      ...jobsRoutes,
    ],
  }
}
