import { jobs } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CATEGORY_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
  JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE,
  JOB_FILTERS_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { eq } from 'drizzle-orm'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getCategories = async (
  request: FastifyRequest<{ Querystring: BASE_MODEL_QUERY_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { categoryRepository } = request.diScope.cradle

  const categories = await categoryRepository.findMany(request.query)

  reply.status(200).send(categories)
}

export const getCategoriesWithJobsCount = async (
  request: FastifyRequest<{ Querystring: BASE_MODEL_QUERY_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { categoryRepository } = request.diScope.cradle

  const categories = await categoryRepository.findManyWithJobsCount(
    request.query,
  )

  return reply.status(200).send(categories)
}

export const getCategory = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { categoryRepository } = request.diScope.cradle

  const result = await categoryRepository.findOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const getCategoryJobs = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Querystring: JOB_FILTERS_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { categoryRepository, jobRepository } = request.diScope.cradle

  const isExist = await categoryRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const result = await jobRepository.findJobsBy({
    where: eq(jobs.categoryId, id),
    query: request.query,
  })

  return reply.status(200).send(result)
}

export const getCategoryJobsAvgSalary = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Querystring: JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { currency, period } = request.query
  const { categoryRepository, jobRepository } = request.diScope.cradle

  const isExist = await categoryRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const avg = await jobRepository.findAvgSalaryBy({
    where: eq(jobs.categoryId, id),
    currency,
    period,
  })

  return reply.status(200).send(avg)
}

export const getTopCategories = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const { categoryRepository } = request.diScope.cradle

  const categories = await categoryRepository.findTopByJobs()

  return reply.status(200).send(categories)
}

export const createCategory = async (
  request: FastifyRequest<{ Body: CREATE_CATEGORY_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { categoryRepository } = request.diScope.cradle

  const result = await categoryRepository.createOne(request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(201).send(result.value)
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

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const result = await categoryRepository.updateOne(id, request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const deleteCategory = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { categoryRepository } = request.diScope.cradle

  const isExist = await categoryRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const result = await categoryRepository.deleteOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}
