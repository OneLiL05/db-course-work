import { GET_BY_ID_SCHEMA_TYPE } from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getUser = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { userRepository } = request.diScope.cradle

  const user = await userRepository.findOne(id)

  if (!user) {
    return reply.status(404).send({ message: 'User with such id not found' })
  }

  return reply.status(200).send(user)
}

export const getUserCompanies = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { roles } = request.user
  const { companyRepository } = request.diScope.cradle

  if (!roles.includes('employer')) {
    return reply.status(200).send([])
  }

  const companies = await companyRepository.findUserCompanies(request.params.id)

  return reply.status(200).send(companies)
}

export const getUserResumes = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { resumeRepository } = request.diScope.cradle

  const resumes = await resumeRepository.findManyByUser(id)

  return reply.status(200).send(resumes)
}
