import {
  CREATE_APPLICATION_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
  UPDATE_APPLICATION_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getApplicationStages = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { applicationRepository } = request.diScope.cradle

  const stages = await applicationRepository.findStages()

  return reply.status(200).send(stages)
}

export const createApplication = async (
  request: FastifyRequest<{ Body: CREATE_APPLICATION_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { applicationRepository } = request.diScope.cradle

  await applicationRepository.createOne(request.body)

  return reply.status(201).send()
}

export const updateApplication = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: UPDATE_APPLICATION_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { applicationRepository } = request.diScope.cradle

  await applicationRepository.updateOne(id, request.body)

  return reply.status(200).send()
}

export const deleteApplication = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { applicationRepository } = request.diScope.cradle

  await applicationRepository.deleteOne(id)

  return reply.status(200).send()
}
