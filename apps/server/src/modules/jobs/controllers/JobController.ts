import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateJob } from '../schemas/index.js'

export const getJobs = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { jobRepository } = request.diScope.cradle

  const jobs = await jobRepository.findMany()

  return reply.status(200).send(jobs)
}

export const createJob = async (
  request: FastifyRequest<{ Body: CreateJob }>,
  reply: FastifyReply,
): Promise<void> => {
  const { jobRepository } = request.diScope.cradle

  await jobRepository.createOne(request.body)

  reply.status(201)
}
