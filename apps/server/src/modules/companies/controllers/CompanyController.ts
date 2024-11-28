import { jobsView } from '@skill-swap/db'
import {
  CREATE_COMPANY_SCHEMA_TYPE,
  CREATE_JOB_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { eq } from 'drizzle-orm'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getCompanies = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { companyRepository } = request.diScope.cradle

  const companies = await companyRepository.findMany()

  return reply.status(200).send(companies)
}

export const getCompany = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository } = request.diScope.cradle

  const result = await companyRepository.findOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const getCompanyJobs = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository, jobRepository } = request.diScope.cradle

  const isExist = await companyRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const jobs = await jobRepository.findJobsBy(eq(jobsView.companyId, id))

  return reply.status(200).send(jobs)
}

export const getCompanyJobsCount = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository, jobRepository } = request.diScope.cradle

  const isExist = await companyRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const count = await jobRepository.findCompanyJobsCount(id)

  return reply.status(200).send(count)
}

export const getCompanyLatestJobsCount = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository, jobRepository } = request.diScope.cradle

  const isExist = await companyRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const count = await jobRepository.findLatestCount(id)

  return reply.status(200).send(count)
}

export const getCompanyAdmins = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository } = request.diScope.cradle

  const isExist = await companyRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const admins = await companyRepository.findAdmins(id)

  return reply.status(200).send(admins)
}

export const createCompany = async (
  request: FastifyRequest<{ Body: CREATE_COMPANY_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { companyRepository, companyAdminRepository } = request.diScope.cradle
  const user = request.user

  const result = await companyRepository.createOne(request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  const { id } = result.value

  // TODO: Move to the transaction
  await companyAdminRepository.createOne(id, {
    userId: user.id,
    role: 'owner',
  })

  return reply.status(201).send(result.value)
}

export const createCompanyJob = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CREATE_JOB_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository, jobRepository } = request.diScope.cradle

  const isExist = await companyRepository.findOne(id)

  if (!isExist) {
    return reply.status(404).send({ message: 'Company with such id not found' })
  }

  await jobRepository.createOne(id, request.body)

  return reply.status(201).send()
}

export const updateCompany = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CREATE_COMPANY_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository } = request.diScope.cradle

  const isExist = await companyRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const isOwner = await companyRepository.isOwner(id, request.user)

  if (!isOwner) {
    return reply.status(401).send({ message: 'Access denied' })
  }

  const result = await companyRepository.updateOne(id, request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const deleteCompany = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository } = request.diScope.cradle

  const isExist = await companyRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const company = await companyRepository.deleteOne(id)

  return reply.status(200).send(company)
}
