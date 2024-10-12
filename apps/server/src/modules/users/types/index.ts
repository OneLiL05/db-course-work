import { BaseDiConfig, InjectableDependencies } from 'types/index.js'
import { UserModuleDependencies } from '../interfaces/index.js'
import { UserWithout } from 'types/models/user.js'

type UserInjectableDependencies = InjectableDependencies<UserModuleDependencies>

type UserDiConfig = BaseDiConfig<UserModuleDependencies>

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
