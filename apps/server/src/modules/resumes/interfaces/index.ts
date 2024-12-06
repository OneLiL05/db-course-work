import { HttpError } from '@/interfaces/common.js'
import { Result } from '@/utils/result.js'
import { MultipartFile } from '@fastify/multipart'
import { Resume } from '@skill-swap/shared'

interface IResumeRepository {
  findOne: (id: number) => Promise<Result<Resume, HttpError>>
  findManyByUser: (userId: number) => Promise<Resume[]>
  createOne: (data: {
    file: MultipartFile
    name: string
    userId: number
  }) => Promise<Resume>
  updateOne: (
    id: number,
    data: { name: string; file?: MultipartFile; fileId?: string },
  ) => Promise<Resume>
  deleteOne: (id: number) => Promise<Resume>
  isCreator: (id: number, userId: number) => Promise<boolean>
}

interface ResumesModuleDependencies {
  resumeRepository: IResumeRepository
}

export type { IResumeRepository, ResumesModuleDependencies }
