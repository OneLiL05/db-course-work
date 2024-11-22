import { jobs, jobsView } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CATEGORY_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
  JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE,
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

export const getCategoryJobs = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { categoryRepository, jobRepository } = request.diScope.cradle

  const isExist = await categoryRepository.findOne(id)

  if (!isExist) {
    return reply
      .status(404)
      .send({ message: 'Category with such id not found' })
  }

  const jobs = await jobRepository.findJobsBy(eq(jobsView.categoryId, id))

  return reply.status(200).send(jobs)
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

  if (!isExist) {
    return reply
      .status(404)
      .send({ message: 'Category with such id not found' })
  }

  const avg = await jobRepository.findAvgSalaryBy({
    where: eq(jobs.categoryId, id),
    currency,
    period,
  })

  return reply.status(200).send(avg)
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
