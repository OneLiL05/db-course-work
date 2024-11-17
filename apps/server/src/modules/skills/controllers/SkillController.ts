import {
  CREATE_SKILL_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { FastifyReply } from 'fastify'
import { FastifyRequest } from 'fastify/types/request.js'

export const getSkills = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { skillRepository } = request.diScope.cradle

  const skills = await skillRepository.findMany()

  return reply.status(200).send(skills)
}

export const getSkillLevels = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { skillRepository } = request.diScope.cradle

  const levels = await skillRepository.findLevels()

  return reply.status(200).send(levels)
}

export const getSkill = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { skillRepository } = request.diScope.cradle

  const skill = await skillRepository.findOne(id)

  if (!skill) {
    return reply.status(404).send({ message: 'Skill with such id not found' })
  }

  return reply.status(200).send(skill)
}

export const createSkill = async (
  request: FastifyRequest<{ Body: CREATE_SKILL_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { skillRepository } = request.diScope.cradle

  const skill = await skillRepository.createOne(request.body)

  if (!skill) {
    return reply.status(500).send({ message: 'Skill creation failed' })
  }

  return reply.status(201).send(skill)
}

export const updateSkill = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CREATE_SKILL_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { skillRepository } = request.diScope.cradle

  const isExist = await skillRepository.findOne(id)

  if (!isExist) {
    return reply.status(404).send({ message: 'Skill with such id not found' })
  }

  const skill = await skillRepository.updateOne(id, request.body)

  if (!skill) {
    return reply.status(500).send({ message: 'Skill update failed' })
  }

  return reply.status(200).send(skill)
}

export const deleteSkill = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { skillRepository } = request.diScope.cradle

  const isExist = await skillRepository.findOne(id)

  if (!isExist) {
    return reply.status(404).send({ message: 'Skill with such id not found' })
  }

  const skill = await skillRepository.deleteOne(id)

  if (!skill) {
    return reply.status(500).send({ message: 'Skill deletion failed' })
  }

  return reply.status(200).send(skill)
}
