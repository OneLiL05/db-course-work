import {
  CREATE_COMPANY_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getCompanies = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { companyRepository } = request.diScope.cradle

  const companies = await companyRepository.findMany()

  return reply.status(200).send(companies)
}

export const getCompany = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository } = request.diScope.cradle

  const company = await companyRepository.findOne(id)

  if (!company) {
    return reply.status(404).send({ message: 'Company with id is not found' })
  }

  return reply.status(200).send(company)
}

export const createCompany = async (
  request: FastifyRequest<{ Body: CREATE_COMPANY_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { companyRepository, companyAdminRepository } = request.diScope.cradle
  const user = request.user

  const company = await companyRepository.createOne(request.body)

  if (!company) {
    return reply.status(500).send({ message: 'Company creation failed' })
  }

  await companyAdminRepository.createOne(company.id, {
    userId: user.id,
    role: 'owner',
  })

  return reply.status(201).send(company)
}

export const updateCompany = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CREATE_COMPANY_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository } = request.diScope.cradle

  const isExists = await companyRepository.findOne(id)

  if (!isExists) {
    return reply.status(404).send({ message: 'Company with such id not found' })
  }

  const company = await companyRepository.updateOne(id, request.body)

  if (!company) {
    return reply.status(500).send({ message: 'Company update failed' })
  }

  return reply.status(200).send(company)
}

export const deleteCompany = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { companyRepository } = request.diScope.cradle

  const isExists = await companyRepository.findOne(id)

  if (!isExists) {
    return reply.status(404).send({ message: 'Company with such id not found' })
  }

  const company = await companyRepository.deleteOne(id)

  if (!company) {
    return reply.status(500).send({ message: 'Company deletion failed' })
  }

  return reply.status(200).send(company)
}
