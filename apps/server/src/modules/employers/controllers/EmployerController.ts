import { FastifyReply, FastifyRequest } from 'fastify'
import { GET_BY_ID_SCHEMA_TYPE } from 'schemas/common.js'
import { CreateEmployer } from '../schemas/index.js'
import { JwtPayload } from 'modules/auth/interfaces/index.js'
import { ACCESS_TOKEN } from 'constants/auth.js'
import { User } from 'schemas/models/user.js'

export const getEmployers = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { employerRepository } = request.diScope.cradle

  const employers = await employerRepository.findMany()

  return reply.status(200).send(employers)
}

export const getEmployer = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { employerRepository } = request.diScope.cradle

  const employer = await employerRepository.findOne(id)

  if (!employer) {
    return reply.status(404).send({ message: 'Employer with id is not found' })
  }

  return reply.status(200).send(employer)
}

export const createEmployer = async (
  request: FastifyRequest<{ Body: CreateEmployer }>,
  reply: FastifyReply,
): Promise<void> => {
  const { employerRepository, userRepository } = request.diScope.cradle
  const user = request.user

  const { employerId } = (await userRepository.findOne(user.id)) as User

  if (employerId) {
    return reply.status(400).send({ message: 'Action denied' })
  }

  const employer = await employerRepository.createOne(request.body)

  if (!employer) {
    return reply.status(500).send({ message: 'Employer creation failed' })
  }

  if (!user.roles.includes('employer')) {
    await userRepository.addRole(user.id, 'employer')

    const payload: JwtPayload = {
      ...user,
      roles: [...user.roles, 'employer'],
    }

    const token = request.jwt.sign(payload)

    reply.setCookie(ACCESS_TOKEN, token, {
      path: '/',
      httpOnly: true,
      secure: true,
    })
  }

  await userRepository.addEmployer(user.id, employer.id)

  return reply.status(201).send(employer)
}

export const updateEmployer = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CreateEmployer
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { employerRepository } = request.diScope.cradle

  const isExists = await employerRepository.findOne(id)

  if (!isExists) {
    return reply
      .status(404)
      .send({ message: 'Employer with such id not found' })
  }

  const employer = await employerRepository.updateOne(id, request.body)

  if (!employer) {
    return reply.status(500).send({ message: 'Employer update failed' })
  }

  return reply.status(200).send(employer)
}

export const deleteEmployer = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { employerRepository } = request.diScope.cradle

  const isExists = await employerRepository.findOne(id)

  if (!isExists) {
    return reply
      .status(404)
      .send({ message: 'Employer with such id not found' })
  }

  const employer = await employerRepository.deleteOne(id)

  if (!employer) {
    return reply.status(500).send({ message: 'Employer deletion failed' })
  }

  return reply.status(200).send(employer)
}
