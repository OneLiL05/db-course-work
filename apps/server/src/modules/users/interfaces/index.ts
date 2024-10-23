import { Role, User } from '@skill-swap/shared'
import { CreateUser } from '../schemas/index.js'
import { ReturnedUser } from '../types/index.js'

interface IUserRepository {
  findOne: (id: number) => Promise<User | null>
  findOneByEmail: (email: string) => Promise<User | null>
  createOne: (data: CreateUser) => Promise<ReturnedUser>
  addRole: (id: number, role: Role) => Promise<void>
  addEmployer: (id: number, employerId: number) => Promise<void>
}

interface UsersModuleDependencies {
  userRepository: IUserRepository
}

export type { IUserRepository, UsersModuleDependencies }
