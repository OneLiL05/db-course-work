import { DatabaseClient, employees } from '@skill-swap/db'
import { IEmployeeRepository } from '../interfaces/index.js'
import { EmployeeInjectableDependencies } from '../types/index.js'
import { CREATE_EMPLOYEE_SCHEMA_TYPE, Employee } from '@skill-swap/shared'
import { eq } from 'drizzle-orm'

export class EmployeeRepository implements IEmployeeRepository {
  private readonly db: DatabaseClient

  constructor({ db }: EmployeeInjectableDependencies) {
    this.db = db.client
  }

  async createOne(data: CREATE_EMPLOYEE_SCHEMA_TYPE): Promise<Employee> {
    const result = await this.db
      .insert(employees)
      .values({ ...data, firedAt: null })
      .returning()

    return result.at(0) as Employee
  }

  async deleteOne(id: number): Promise<Employee> {
    const result = await this.db
      .delete(employees)
      .where(eq(employees.id, id))
      .returning()

    return result.at(0) as Employee
  }
}
