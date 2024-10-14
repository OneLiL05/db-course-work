import { Routes } from 'interfaces/index.js'
import { getBaseRoutes } from './index.js'
import { AppInstanse } from 'types/index.js'
import { getAuthRoutes } from './auth/routes/index.js'
import { getCitiesRoutes } from './cities/routes/index.js'

export const getRoutes = (app: AppInstanse): Routes => {
  const { routes: baseRoutes } = getBaseRoutes()
  const { routes: authRoutes } = getAuthRoutes(app)
  const { routes: citiesRoutes } = getCitiesRoutes()

  return {
    routes: [...baseRoutes, ...authRoutes, ...citiesRoutes],
  }
}
