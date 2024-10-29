import { BaseDiConfig, InjectableDependencies } from '@/types/index.js'
import { SkillsModuleDependencies } from '../interfaces/index.js'

type SkillInjectableDependencies =
  InjectableDependencies<SkillsModuleDependencies>

type SkillsDiConfig = BaseDiConfig<SkillsModuleDependencies>

export type { SkillInjectableDependencies, SkillsDiConfig }
