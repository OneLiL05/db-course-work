import { Role, SqlClient } from 'types/index.js'
import { IUserRepository } from '../interfaces/index.js'
import { CreateUser } from '../schemas/index.js'
import { ReturnedUser, UserInjectableDependencies } from '../types/index.js'
import { User } from 'schemas/models/user.js'
import { ROLES } from 'constants/roles.js'

export class UserRepository implements IUserRepository {
  private readonly sql: SqlClient

  constructor({ sql }: UserInjectableDependencies) {
    this.sql = sql
  }

  async findOne(id: number): Promise<User | null> {
    const [user]: [User?] = await this.sql`
      select
        u.id,
        u.username,
        u.email,
        u.first_name,
        u.last_name,
        u.password,
        u.img,
        u.created_at,
        u.updated_at,
        u.employer_id,
        array_agg(r.name) AS roles
      from
        users u
      left join
        user_roles ur on u.id=ur.user_id
      left join
        roles r ON ur.role_id=r.id
      where
        u.id=${id}
      group by
        u.id;
    `

    if (!user) return null

    return user
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const [user]: [User?] = await this.sql`
      select
        u.id,
        u.username,
        u.email,
        u.first_name,
        u.last_name,
        u.password,
        u.img,
        u.created_at,
        u.updated_at,
        u.employer_id,
        array_agg(r.name) AS roles
      from
        users u
      left join
        user_roles ur on u.id=ur.user_id
      left join
        roles r ON ur.role_id=r.id
      where
        u.email=${email}
      group by
        u.id;
      `

    if (!user) return null

    return user
  }

  async createOne(data: CreateUser): Promise<ReturnedUser> {
    const { username, email, password, firstName, lastName, img } = data

    const users = await this.sql<ReturnedUser[]>`
      insert into users
        (username, email, password, first_name, last_name, img)
      values
        (${username}, ${email}, ${password}, ${firstName}, ${lastName}, ${img})
      returning users.id, users.username, users.email, users.first_name, users.last_name, users.img
    `

    const user = users.at(0) as ReturnedUser

    await this.sql`
      insert into user_roles
        (user_id, role_id)
      values
        (${user.id}, 3)
      returning role_id
    `

    return user
  }

  async addRole(id: number, role: Role): Promise<void> {
    await this.sql`
      insert into user_roles
       (user_id, role_id)
      values
        (${id}, ${ROLES.get(role) as number})
    `
  }

  async addEmployer(id: number, employerId: number): Promise<void> {
    await this.sql`
      update users
      set employer_id=${employerId}
      where id=${id}
    `
  }
}
