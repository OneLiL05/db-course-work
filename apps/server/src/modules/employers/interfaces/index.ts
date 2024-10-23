import { Employer } from '@/schemas/models/employer.js'
import { CreateEmployer } from '../schemas/index.js'

interface IEmployerRepository {
  findMany: () => Promise<Employer[]>
  findOne: (id: number) => Promise<Employer | null>
  createOne: (data: CreateEmployer) => Promise<Employer | null>
  updateOne: (id: number, data: CreateEmployer) => Promise<Employer | null>
  deleteOne: (id: number) => Promise<Employer | null>
}

interface EmployersModuleDependencies {
  employerRepository: IEmployerRepository
}

export type { IEmployerRepository, EmployersModuleDependencies }
