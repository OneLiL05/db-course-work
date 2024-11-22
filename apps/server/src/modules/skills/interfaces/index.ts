import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_SKILL_SCHEMA_TYPE,
  Skill,
  SkillLevel,
} from '@skill-swap/shared'

interface ISkillRepository {
  findMany: (query: BASE_MODEL_QUERY_TYPE) => Promise<Skill[]>
  findLevels: () => Promise<SkillLevel[]>
  findOne: (id: number) => Promise<Skill | null>
  createOne: (data: CREATE_SKILL_SCHEMA_TYPE) => Promise<Skill | null>
  updateOne: (
    id: number,
    data: CREATE_SKILL_SCHEMA_TYPE,
  ) => Promise<Skill | null>
  deleteOne: (id: number) => Promise<Skill | null>
}

interface SkillsModuleDependencies {
  skillRepository: ISkillRepository
}

export type { ISkillRepository, SkillsModuleDependencies }
