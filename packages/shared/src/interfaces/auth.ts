import type { Role } from '../types/index.js'

interface AuthTokens {
  access_token: string
}

interface JwtPayload {
  id: number
  email: string
  username: string
  roles: Role[]
}

export type { AuthTokens, JwtPayload }
