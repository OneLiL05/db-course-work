import { Routes } from '@/interfaces/index.js'
import { AppInstanse } from '@/types/index.js'
import {
  createResume,
  deleteResume,
  updateResume,
} from '../controllers/ResumeController.js'

export const getResumesRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'POST',
      url: '/resumes',
      handler: createResume,
      preHandler: [app.authentificate],
    },
    {
      method: 'PUT',
      url: '/resumes/:id',
      handler: updateResume,
      preHandler: [app.authentificate],
    },
    {
      method: 'DELETE',
      url: '/resumes/:id',
      handler: deleteResume,
      preHandler: [app.authentificate],
    },
  ],
})
