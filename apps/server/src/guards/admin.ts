import { createRoleGuard } from '@/factories/createRoleGuard.js'

export const adminGuard = createRoleGuard(['admin'])
