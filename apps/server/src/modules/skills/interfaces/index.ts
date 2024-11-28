import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_SKILL_SCHEMA_TYPE,
  Skill,
  SkillLevel,
} from '@skill-swap/shared'

interface ISkillRepository {
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<Skill[]>
  findLevels: () => Promise<SkillLevel[]>
  findOne: (id: number) => Promise<Result<Skill, HttpError>>
  createOne: (
    data: CREATE_SKILL_SCHEMA_TYPE,
  ) => Promise<Result<Skill, HttpError>>
  updateOne: (
    id: number,
    data: CREATE_SKILL_SCHEMA_TYPE,
  ) => Promise<Result<Skill, HttpError>>
  deleteOne: (id: number) => Promise<Result<Skill, HttpError>>
}

interface SkillsModuleDependencies {
  skillRepository: ISkillRepository
}

export type { ISkillRepository, SkillsModuleDependencies }
