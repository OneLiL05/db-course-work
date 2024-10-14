import { createRoleGuard } from 'factories/index.js'

export const adminGuard = createRoleGuard(['admin'])
