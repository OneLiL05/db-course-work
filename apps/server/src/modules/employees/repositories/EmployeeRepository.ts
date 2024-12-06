import {
  DatabaseClient,
  employees,
  jobSalaries,
  jobs,
  users,
} from '@skill-swap/db'
import { IEmployeeRepository } from '../interfaces/index.js'
import { EmployeeInjectableDependencies } from '../types/index.js'
import {
  CREATE_EMPLOYEE_SCHEMA_TYPE,
  CompanyEmployee,
  Employee,
} from '@skill-swap/shared'
import { eq, getTableColumns, sql } from 'drizzle-orm'

export class EmployeeRepository implements IEmployeeRepository {
  private readonly db: DatabaseClient

  constructor({ db }: EmployeeInjectableDependencies) {
    this.db = db.client
  }

  async findManyByCompany(companyId: number): Promise<CompanyEmployee[]> {
    const columns = getTableColumns(employees)

    return this.db
      .select({
        ...columns,
        employeeName:
          sql<string>`concat(${users.firstName}, ' ', ${users.lastName})`.as(
            'employer_name',
          ),
        employeeJob: jobs.name,
        salaryAmount: jobSalaries.amount,
        salaryCurrency: jobSalaries.currency,
        salaryPeriod: jobSalaries.period,
      })
      .from(employees)
      .leftJoin(users, eq(users.id, employees.userId))
      .leftJoin(jobs, eq(jobs.id, employees.jobId))
      .leftJoin(jobSalaries, eq(jobSalaries.jobId, jobs.id))
      .where(eq(jobs.companyId, companyId)) as unknown as CompanyEmployee[]
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
