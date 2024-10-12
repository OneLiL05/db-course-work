import { Role } from 'types/index.js'

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
  role: Role[]
}

export type { IAuthService, AuthModuleDependecies, JwtPayload }
