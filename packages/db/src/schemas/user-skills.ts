import { relations } from 'drizzle-orm'
import { integer, pgTable } from 'drizzle-orm/pg-core'
import { baseSchemaAttrs } from '../utils.js'
import { skillLevels } from './skill-levels.js'
import { skills } from './skills.js'
import { users } from './users.js'

const { id } = baseSchemaAttrs

export const userSkills = pgTable('user_skills', {
  id,
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  skillId: integer('skill_id')
    .notNull()
    .references(() => skills.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  skillLevelId: integer('skill_level_id')
    .notNull()
    .references(() => skillLevels.id, {
      onDelete: 'restrict',
      onUpdate: 'cascade',
    }),
})

export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [userSkills.skillId],
    references: [skills.id],
  }),
  skillLevel: one(skillLevels, {
    fields: [userSkills.skillLevelId],
    references: [skillLevels.id],
  }),
}))
