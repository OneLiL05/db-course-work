import {
  BaseDiConfig,
  InjectableDependencies,
  UserWithout,
} from '@/types/index.js'
import { UsersModuleDependencies } from '../interfaces/index.js'

type UserInjectableDependencies =
  InjectableDependencies<UsersModuleDependencies>

type UserDiConfig = BaseDiConfig<UsersModuleDependencies>

type ReturnedUser = UserWithout<
  'createdAt' | 'updatedAt' | 'password' | 'employerId' | 'roles'
>

type NewType = UserWithout<'password'>

type PasswordlessUser = NewType

export type {
  UserInjectableDependencies,
  UserDiConfig,
  ReturnedUser,
  PasswordlessUser,
}
