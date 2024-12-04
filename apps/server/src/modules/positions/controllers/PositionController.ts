import { jobs } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_POSITION_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
  JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE,
  JOB_FILTERS_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { eq } from 'drizzle-orm'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getPositions = async (
  request: FastifyRequest<{ Querystring: BASE_MODEL_QUERY_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { positionRepository } = request.diScope.cradle

  const positions = await positionRepository.findMany(request.query)

  return reply.status(200).send(positions)
}

export const getPositionsWithJobsCount = async (
  request: FastifyRequest<{ Querystring: BASE_MODEL_QUERY_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { positionRepository } = request.diScope.cradle

  const positions = await positionRepository.findManyWithJobsCount(
    request.query,
  )

  return reply.status(200).send(positions)
}

export const getPosition = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { positionRepository } = request.diScope.cradle

  const result = await positionRepository.findOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const getPositionJobs = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Querystring: JOB_FILTERS_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { positionRepository, jobRepository } = request.diScope.cradle

  const isExist = await positionRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const result = await jobRepository.findJobsBy({
    where: eq(jobs.positionId, id),
    query: request.query,
  })

  return reply.status(200).send(result)
}

export const getPositionJobsAvgSalary = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Querystring: JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { currency, period } = request.query
  const { positionRepository, jobRepository } = request.diScope.cradle

  const isExist = await positionRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const avg = await jobRepository.findAvgSalaryBy({
    where: eq(jobs.positionId, id),
    currency,
    period,
  })

  return reply.status(200).send(avg)
}

export const createPosition = async (
  request: FastifyRequest<{ Body: CREATE_POSITION_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { positionRepository } = request.diScope.cradle

  const result = await positionRepository.createOne(request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(201).send(result.value)
}

export const updatePosition = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CREATE_POSITION_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { positionRepository } = request.diScope.cradle

  const isExists = await positionRepository.findOne(id)

  if (!isExists.success) {
    const { status, message } = isExists.error

    return reply.status(status).send({ message })
  }

  const result = await positionRepository.updateOne(id, request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const deletePosition = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { positionRepository } = request.diScope.cradle

  const isExists = await positionRepository.findOne(id)

  if (!isExists.success) {
    const { status, message } = isExists.error

    return reply.status(status).send({ message })
  }

  const result = await positionRepository.deleteOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}
