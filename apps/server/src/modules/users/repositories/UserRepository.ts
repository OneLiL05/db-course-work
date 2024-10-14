import { SqlClient } from 'types/index.js'
import { IUserRepository } from '../interfaces/index.js'
import { CreateUser } from '../schemas/index.js'
import { ReturnedUser, UserInjectableDependencies } from '../types/index.js'
import { User } from 'schemas/models/user.js'

export class UserRepository implements IUserRepository {
  private readonly sql: SqlClient

  constructor({ sql }: UserInjectableDependencies) {
    this.sql = sql
  }

  async findOne(id: number): Promise<User | null> {
    const [user]: [User?] = await this.sql`select * from users where id = ${id}`

    if (!user) return null

    return user
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const [user]: [User?] = await this
      .sql`select * from users where email = ${email}`

    if (!user) return null

    return user
  }

  async createOne(data: CreateUser): Promise<ReturnedUser> {
    const { username, email, password, first_name, last_name, img } = data

    const users = await this.sql<ReturnedUser[]>`
      insert into users
        (username, email, password, first_name, last_name, img)
      values
        (${username}, ${email}, ${password}, ${first_name}, ${last_name}, ${img})
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
}
