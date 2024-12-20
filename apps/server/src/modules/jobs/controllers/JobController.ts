import {
  GET_BY_ID_SCHEMA_TYPE,
  UPDATE_JOB_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getJobs = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { jobRepository } = request.diScope.cradle

  const jobs = await jobRepository.findMany()

  return reply.status(200).send(jobs)
}

export const getFavouritedJobs = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { jobRepository } = request.diScope.cradle

  const favouritedJobs = await jobRepository.findFavourite(request.user.id)

  return reply.status(200).send(favouritedJobs)
}

export const getJob = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { jobRepository } = request.diScope.cradle

  const result = await jobRepository.findOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const updateJob = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: UPDATE_JOB_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { jobRepository } = request.diScope.cradle

  const isExist = await jobRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  await jobRepository.updateOne(id, request.body)

  return reply.status(200).send()
}

export const favouriteJob = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { jobRepository } = request.diScope.cradle

  const isExist = await jobRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  await jobRepository.favouriteOne(id, request.user.id)

  return reply.status(200).send(isExist.value)
}

export const unfavouriteJob = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { jobRepository } = request.diScope.cradle

  const isExist = await jobRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  await jobRepository.unfavouriteOne(id, request.user.id)

  return reply.status(200).send(isExist.value)
}

export const deleteJob = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { jobRepository, companyRepository } = request.diScope.cradle

  const isExist = await jobRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const { companyId } = isExist.value

  const isOwner = await companyRepository.isOwner(companyId, request.user)

  if (!isOwner || !request.user.roles.includes('admin')) {
    return reply.status(401).send({ message: 'Access denied' })
  }

  await jobRepository.deleteOne(id)

  return reply.status(200).send(null)
}
