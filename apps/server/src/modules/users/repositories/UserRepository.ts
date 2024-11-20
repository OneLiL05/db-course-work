import { ROLES } from '@/constants/index.js'
import { DatabaseClient, roles, userRoles, users } from '@skill-swap/db'
import { CREATE_USER_SCHEMA_TYPE, Role, User } from '@skill-swap/shared'
import { eq, getTableColumns } from 'drizzle-orm'
import { IUserRepository } from '../interfaces/index.js'
import { ReturnedUser, UserInjectableDependencies } from '../types/index.js'

export class UserRepository implements IUserRepository {
  private readonly db: DatabaseClient

  constructor({ db }: UserInjectableDependencies) {
    this.db = db.client
  }

  async findOne(id: number): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .innerJoin(userRoles, eq(users.id, userRoles.userId))
      .innerJoin(roles, eq(roles.id, userRoles.id))
      .where(eq(users.id, id))

    const user = result.at(0)

    if (!user) return null

    return {
      ...user.users,
      roles: result.map((u) => u.roles.name) as Role[],
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .innerJoin(userRoles, eq(users.id, userRoles.userId))
      .innerJoin(roles, eq(roles.id, userRoles.id))
      .where(eq(users.email, email))

    const user = result.at(0)

    if (!user) return null

    return {
      ...user.users,
      roles: result.map((u) => u.roles.name) as Role[],
    }
  }

  async createOne(data: CREATE_USER_SCHEMA_TYPE): Promise<ReturnedUser> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, password, ...rest } = getTableColumns(users)

    const user = await this.db.transaction(async (tx) => {
      const result = await tx
        .insert(users)
        .values(data)
        .returning({ ...rest })

      const user = result.at(0) as ReturnedUser

      await this.db.insert(userRoles).values({ userId: user.id, roleId: 3 })

      return user
    })

    return user
  }

  async addRole(id: number, role: Role): Promise<void> {
    await this.db
      .insert(userRoles)
      .values({ userId: id, roleId: ROLES.get(role) as number })
  }
}
