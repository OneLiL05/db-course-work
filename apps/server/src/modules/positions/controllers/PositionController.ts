import { FastifyReply, FastifyRequest } from 'fastify'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_POSITION_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
  JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { eq } from 'drizzle-orm'
import { jobs, jobsView } from '@skill-swap/db'

export const getPositions = async (
  request: FastifyRequest<{ Querystring: BASE_MODEL_QUERY_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { positionRepository } = request.diScope.cradle

  const positions = await positionRepository.findMany(request.query)

  return reply.status(200).send(positions)
}

export const getPosition = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { positionRepository } = request.diScope.cradle

  const position = await positionRepository.findOne(id)

  if (!position) {
    return reply.status(404).send({ message: 'Position with id is not found' })
  }

  return reply.status(200).send(position)
}

export const getPositionJobs = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { positionRepository, jobRepository } = request.diScope.cradle

  const position = await positionRepository.findOne(id)

  if (!position) {
    return reply.status(404).send({ message: 'Position with id is not found' })
  }

  const jobs = await jobRepository.findJobsBy(eq(jobsView.positionId, id))

  return reply.status(200).send(jobs)
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

  const position = await positionRepository.findOne(id)

  if (!position) {
    return reply.status(404).send({ message: 'Position with id is not found' })
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

  const position = await positionRepository.createOne(request.body)

  if (!position) {
    return reply.status(500).send({ message: 'Position creation failed' })
  }

  return reply.status(201).send(position)
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

  if (!isExists) {
    return reply
      .status(404)
      .send({ message: 'Position with such id not found' })
  }

  const position = await positionRepository.updateOne(id, request.body)

  if (!position) {
    return reply.status(500).send({ message: 'Position update failed' })
  }

  return reply.status(200).send(position)
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

  if (!isExists) {
    return reply
      .status(404)
      .send({ message: 'Position with such id not found' })
  }

  const position = await positionRepository.deleteOne(id)

  if (!position) {
    return reply.status(500).send({ message: 'Position deletion failed' })
  }

  return reply.status(200).send(position)
}
