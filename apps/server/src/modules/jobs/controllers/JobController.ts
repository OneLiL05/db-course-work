import { GET_BY_ID_SCHEMA_TYPE } from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getJobs = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { jobRepository } = request.diScope.cradle

  const jobs = await jobRepository.findMany()

  return reply.status(200).send(jobs)
}

export const getJob = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { jobRepository } = request.diScope.cradle

  const job = await jobRepository.findOne(id)

  if (!job) {
    return reply.status(404).send({ message: 'Job with such id not found' })
  }

  return reply.status(200).send(job)
}
