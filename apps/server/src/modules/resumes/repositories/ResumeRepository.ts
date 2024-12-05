import { AppwriteConfig } from '@/interfaces/config.js'
import { MultipartFile } from '@fastify/multipart'
import { resumes, type DatabaseClient } from '@skill-swap/db'
import { Resume } from '@skill-swap/shared'
import { and, desc, eq } from 'drizzle-orm'
import { InputFile, type Storage } from 'node-appwrite'
import { randomBytes } from 'node:crypto'
import { IResumeRepository } from '../interfaces/index.js'
import { ResumeInjectableDependencies } from '../types/index.js'
import { HttpError } from '@/interfaces/common.js'
import { Failure, Result, Success } from '@/utils/result.js'

export class ResumeRepository implements IResumeRepository {
  private readonly db: DatabaseClient
  private readonly storage: Storage
  private readonly config: AppwriteConfig
  private readonly bucketId: string = '6751d7650025b97c1cb0'

  constructor({ storage, db, config }: ResumeInjectableDependencies) {
    this.db = db.client
    this.storage = storage
    this.config = config.appwrite
  }

  async findOne(id: number): Promise<Result<Resume, HttpError>> {
    const result = await this.db
      .select()
      .from(resumes)
      .where(eq(resumes.id, id))

    const resume = result.at(0)

    if (!resume) {
      return Failure<HttpError>({
        status: 404,
        message: 'Resume with such id not found',
      })
    }

    return Success(resume)
  }

  async findManyByUser(userId: number): Promise<Resume[]> {
    return this.db
      .select()
      .from(resumes)
      .where(eq(resumes.userId, userId))
      .orderBy(desc(resumes.createdAt))
  }

  async createOne({
    file,
    userId,
    name,
  }: {
    file: MultipartFile
    name: string
    userId: number
  }): Promise<Resume> {
    const fileId = randomBytes(16).toString('hex')

    const fileBuffer = await file.toBuffer()

    const uploadedFile = await this.storage.createFile(
      this.bucketId,
      fileId,
      InputFile.fromBuffer(fileBuffer, file.filename),
    )

    const path = new URL(
      `${this.config.endpointUrl}/storage/buckets/${this.bucketId}/files/${uploadedFile.$id}/view`,
    )

    path.searchParams.append('project', this.config.project)
    path.searchParams.append('mode', 'admin')

    const result = await this.db
      .insert(resumes)
      .values({ userId, fileId, path: path.toString(), name })
      .returning()

    return result.at(0) as Resume
  }

  async updateOne(
    id: number,
    {
      name,
      file,
      fileId,
    }: { name: string; file?: MultipartFile; fileId?: string },
  ): Promise<Resume> {
    const result = await this.db
      .update(resumes)
      .set({ name })
      .where(eq(resumes.id, id))
      .returning()

    const resume = result.at(0) as Resume

    let newPath: URL | null = null

    if (file && fileId) {
      await this.storage.deleteFile(this.bucketId, fileId)

      const newFileId = randomBytes(16).toString('hex')

      const fileBuffer = await file.toBuffer()

      const newFile = await this.storage.createFile(
        this.bucketId,
        newFileId,
        InputFile.fromBuffer(fileBuffer, file.filename),
      )

      newPath = new URL(
        `${this.config.endpointUrl}/storage/buckets/${this.bucketId}/files/${newFile.$id}/view`,
      )

      newPath.searchParams.append('project', this.config.project)
      newPath.searchParams.append('mode', 'admin')

      await this.db
        .update(resumes)
        .set({ fileId: newFileId, path: newPath.toString() })
        .where(eq(resumes.id, id))
    }

    return newPath ? { ...resume, path: newPath.toString() } : resume
  }

  async deleteOne(id: number): Promise<Resume> {
    const result = await this.db
      .delete(resumes)
      .where(eq(resumes.id, id))
      .returning()

    const resume = result.at(0) as Resume

    await this.storage.deleteFile(this.bucketId, resume.fileId)

    return resume
  }

  async isCreator(id: number, userId: number): Promise<boolean> {
    const result = await this.db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))

    return result.at(0) ? true : false
  }
}
