import { Role } from '@skill-swap/shared'

interface IAuthService {
  generateHash: (password: string) => Promise<string>
  verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>
}

interface AuthModuleDependecies {
  authService: IAuthService
}

interface JwtPayload {
  id: number
  email: string
  username: string
  roles: Role[]
}

export type { IAuthService, AuthModuleDependecies, JwtPayload }
