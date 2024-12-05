import { getAuthRoutes } from './auth/routes/index.js'
import { getCategoriesRoutes } from './categories/routes/index.js'
import { getCitiesRoutes } from './cities/routes/index.js'
import { getBaseRoutes } from './getBaseRoutes.js'
import { getCompaniesRoutes } from './companies/routes/index.js'
import { getPositionsRoutes } from './positions/routes/index.js'
import { getJobsRoutes } from './jobs/routes/index.js'
import { AppInstanse } from '@/types/index.js'
import { Routes } from '@/interfaces/index.js'
import { getUsersRoutes } from './users/routes/index.js'
import { getSkillsRoutes } from './skills/routes/index.js'
import { getResumeRoutes } from './resumes/routes/index.js'

export const getRoutes = (app: AppInstanse): Routes => {
  const { routes: baseRoutes } = getBaseRoutes()
  const { routes: authRoutes } = getAuthRoutes(app)
  const { routes: citiesRoutes } = getCitiesRoutes(app)
  const { routes: categoriesRoutes } = getCategoriesRoutes(app)
  const { routes: companiesRoutes } = getCompaniesRoutes(app)
  const { routes: positionsRoutes } = getPositionsRoutes(app)
  const { routes: jobsRoutes } = getJobsRoutes(app)
  const { routes: userRoutes } = getUsersRoutes(app)
  const { routes: skillsRoutes } = getSkillsRoutes(app)
  const { routes: resumeRoutes } = getResumeRoutes(app)

  return {
    routes: [
      ...baseRoutes,
      ...authRoutes,
      ...citiesRoutes,
      ...categoriesRoutes,
      ...companiesRoutes,
      ...positionsRoutes,
      ...jobsRoutes,
      ...userRoutes,
      ...skillsRoutes,
      ...resumeRoutes,
    ],
  }
}
