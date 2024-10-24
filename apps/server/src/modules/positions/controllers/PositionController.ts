import { FastifyReply, FastifyRequest } from 'fastify'
import { CreatePosition } from '../schemas/index.js'
import { GET_BY_ID_SCHEMA_TYPE } from '@skill-swap/shared'

export const getPositions = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { positionRepository } = request.diScope.cradle

  const positions = await positionRepository.findMany()

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

export const createPosition = async (
  request: FastifyRequest<{ Body: CreatePosition }>,
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
    Body: CreatePosition
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
