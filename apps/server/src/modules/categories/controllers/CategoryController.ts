import {
  CREATE_CATEGORY_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getCategories = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { categoryRepository } = request.diScope.cradle

  const categories = await categoryRepository.findMany()

  reply.status(200).send(categories)
}

export const getCategory = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { categoryRepository } = request.diScope.cradle

  const category = await categoryRepository.findOne(id)

  if (!category) {
    return reply
      .status(404)
      .send({ message: 'Category with such id not found' })
  }

  return reply.status(200).send(category)
}

export const createCategory = async (
  request: FastifyRequest<{ Body: CREATE_CATEGORY_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { categoryRepository } = request.diScope.cradle

  const category = await categoryRepository.createOne(request.body)

  if (!category) {
    return reply.status(500).send({ message: 'Category creation failed' })
  }

  return reply.status(201).send(category)
}

export const updateCategory = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CREATE_CATEGORY_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { categoryRepository } = request.diScope.cradle

  const isExist = await categoryRepository.findOne(id)

  if (!isExist) {
    return reply
      .status(404)
      .send({ message: 'Category with such id not found' })
  }

  const category = await categoryRepository.updateOne(id, request.body)

  if (!category) {
    return reply.status(500).send({ message: 'Category update failed' })
  }

  return reply.status(200).send(category)
}

export const deleteCategory = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { categoryRepository } = request.diScope.cradle

  const isExist = await categoryRepository.findOne(id)

  if (!isExist) {
    return reply
      .status(404)
      .send({ message: 'Category with such id not found' })
  }

  const category = await categoryRepository.deleteOne(id)

  if (!category) {
    return reply.status(500).send({ message: 'Category deletion failed' })
  }

  return reply.status(200).send(category)
}
