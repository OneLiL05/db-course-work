import { createRoleGuard } from 'factories/index.js'

export const nonUserGuard = createRoleGuard(['admin', 'employer'])
