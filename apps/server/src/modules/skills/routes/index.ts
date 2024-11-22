import { Routes } from '@/interfaces/index.js'
import {
  createSkill,
  deleteSkill,
  getSkill,
  getSkillLevels,
  getSkills,
  updateSkill,
} from '../controllers/SkillController.js'
import {
  BASE_MODEL_QUERY,
  CREATE_SKILL_SCHEMA,
  GET_BY_ID_SCHEMA,
} from '@skill-swap/shared'
import { AppInstanse } from '@/types/index.js'

export const getSkillsRoutes = (app: AppInstanse): Routes => ({
  routes: [
    {
      method: 'GET',
      url: '/skills',
      handler: getSkills,
      schema: {
        querystring: BASE_MODEL_QUERY,
      },
    },
    {
      method: 'GET',
      url: '/skills/levels',
      handler: getSkillLevels,
    },
    {
      method: 'GET',
      url: '/skills/:id',
      handler: getSkill,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
    },
    {
      method: 'POST',
      url: '/skills',
      handler: createSkill,
      schema: {
        body: CREATE_SKILL_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'PUT',
      url: '/skills/:id',
      handler: updateSkill,
      schema: {
        params: GET_BY_ID_SCHEMA,
        body: CREATE_SKILL_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
    {
      method: 'DELETE',
      url: '/skills/:id',
      handler: deleteSkill,
      schema: {
        params: GET_BY_ID_SCHEMA,
      },
      preHandler: [app.authentificate, app.isAdmin],
    },
  ],
})
