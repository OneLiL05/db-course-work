import { createRoleGuard } from '@/factories/createRoleGuard.js'

export const employerGuard = createRoleGuard(['employer'])
