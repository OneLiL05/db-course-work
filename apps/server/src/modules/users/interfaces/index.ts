import { User } from 'types/models/user.js'
import { CreateUser } from '../schemas/index.js'
import { ReturnedUser } from '../types/index.js'

interface IUserRepository {
  findOne: (id: number) => Promise<User | null>
  findOneByEmail: (email: string) => Promise<User | null>
  createOne: (data: CreateUser) => Promise<ReturnedUser>
}

interface UsersModuleDependencies {
  userRepository: IUserRepository
}

export type { IUserRepository, UsersModuleDependencies }
