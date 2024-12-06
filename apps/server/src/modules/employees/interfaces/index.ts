import {
  CREATE_EMPLOYEE_SCHEMA_TYPE,
  CompanyEmployee,
  Employee,
} from '@skill-swap/shared'

interface IEmployeeRepository {
  findManyByCompany: (companyId: number) => Promise<CompanyEmployee[]>
  createOne: (data: CREATE_EMPLOYEE_SCHEMA_TYPE) => Promise<Employee>
  deleteOne: (id: number) => Promise<Employee>
}

interface EmployeesModuleDependencies {
  employeeRepository: IEmployeeRepository
}

export type { EmployeesModuleDependencies, IEmployeeRepository }
