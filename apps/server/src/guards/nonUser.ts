import { createRoleGuard } from '@/factories/createRoleGuard.js'

export const nonUserGuard = createRoleGuard(['admin', 'employer'])
