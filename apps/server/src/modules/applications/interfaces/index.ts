import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import {
  APPLICATION_FILTERS_SCHEMA_TYPE,
  Application,
  ApplicationStage,
  CREATE_APPLICATION_SCHEMA_TYPE,
  CompanyApplication,
  UPDATE_APPLICATION_SCHEMA_TYPE,
  UserApplication,
} from '@skill-swap/shared'

interface IApplicationRepository {
  findOne: (
    id: number,
  ) => Promise<Result<Application & { userId: number }, HttpError>>
  findStages: () => Promise<ApplicationStage[]>
  findManyByUser: (
    userId: number,
    query?: APPLICATION_FILTERS_SCHEMA_TYPE,
  ) => Promise<UserApplication[]>
  findManyByCompany: (
    companyId: number,
    query?: APPLICATION_FILTERS_SCHEMA_TYPE,
  ) => Promise<CompanyApplication[]>
  createOne: (data: CREATE_APPLICATION_SCHEMA_TYPE) => Promise<void>
  updateOne: (
    id: number,
    data: UPDATE_APPLICATION_SCHEMA_TYPE,
  ) => Promise<{ stageId: number }>
  deleteOne: (id: number) => Promise<void>
}

interface ApplicationsModuleDependencies {
  applicationRepository: IApplicationRepository
}

export type { ApplicationsModuleDependencies, IApplicationRepository }
