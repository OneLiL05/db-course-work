import { MultipartFile } from '@fastify/multipart'
import { GET_BY_ID_SCHEMA_TYPE } from '@skill-swap/shared'
import { FastifyReply, FastifyRequest } from 'fastify'

export const createResume = async (
  request: FastifyRequest<{
    Body: { name: { value: string }; file: MultipartFile }
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { resumeRepository } = request.diScope.cradle

  const { file, name } = request.body

  if (!file) {
    return reply.status(400).send({ message: 'No file uploaded' })
  }

  const resume = await resumeRepository.createOne({
    userId: request.user.id,
    file,
    name: name.value as string,
  })

  return reply.status(201).send(resume)
}

export const updateResume = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: { name: { value: string }; file?: MultipartFile }
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { resumeRepository } = request.diScope.cradle

  const { file, name } = request.body
  console.log(request.body)

  const isExist = await resumeRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const hasRights = await resumeRepository.isCreator(id, request.user.id)

  if (!hasRights || !request.user.roles.includes('admin')) {
    return reply.status(401).send({ message: 'Access denied' })
  }

  const result = await resumeRepository.updateOne(id, {
    name: name.value,
    file,
    fileId: isExist.value.fileId,
  })

  return reply.status(200).send(result)
}

export const deleteResume = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { resumeRepository } = request.diScope.cradle

  const isExist = await resumeRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const hasRights = await resumeRepository.isCreator(id, request.user.id)

  if (!hasRights || !request.user.roles.includes('admin')) {
    return reply.status(401).send({ message: 'Access denied' })
  }

  const result = await resumeRepository.deleteOne(id)

  return reply.status(200).send(result)
}
