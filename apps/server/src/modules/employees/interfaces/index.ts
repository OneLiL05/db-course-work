import { CREATE_EMPLOYEE_SCHEMA_TYPE, Employee } from '@skill-swap/shared'

interface IEmployeeRepository {
  createOne: (data: CREATE_EMPLOYEE_SCHEMA_TYPE) => Promise<Employee>
  deleteOne: (id: number) => Promise<Employee>
}

interface EmployeesModuleDependencies {
  employeeRepository: IEmployeeRepository
}

export type { EmployeesModuleDependencies, IEmployeeRepository }
