import {
  CREATE_EMPLOYEE_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createEmployee = async (
  request: FastifyRequest<{ Body: CREATE_EMPLOYEE_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { employeeRepository } = request.diScope.cradle

  const employee = await employeeRepository.createOne(request.body)

  return reply.status(201).send(employee)
}

export const deleteEmployee = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { employeeRepository } = request.diScope.cradle

  const employee = await employeeRepository.deleteOne(id)

  return reply.status(201).send(employee)
}
