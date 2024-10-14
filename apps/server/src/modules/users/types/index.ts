import { BaseDiConfig, InjectableDependencies } from 'types/index.js'
import { UsersModuleDependencies } from '../interfaces/index.js'
import { UserWithout } from 'types/models/user.js'

type UserInjectableDependencies =
  InjectableDependencies<UsersModuleDependencies>

type UserDiConfig = BaseDiConfig<UsersModuleDependencies>

type ReturnedUser = UserWithout<
  'created_at' | 'updated_at' | 'password' | 'employer_id' | 'roles'
>

type PasswordlessUser = UserWithout<'password'>

export type {
  UserInjectableDependencies,
  UserDiConfig,
  ReturnedUser,
  PasswordlessUser,
}
