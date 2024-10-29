import { CREATE_SKILL_SCHEMA_TYPE, Skill } from '@skill-swap/shared'

interface ISkillRepository {
  findMany: () => Promise<Skill[]>
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
