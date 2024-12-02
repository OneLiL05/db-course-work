import { jobs } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CITY_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
  JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE,
  JOB_FILTERS_SCHEMA_TYPE,
} from '@skill-swap/shared'
import { eq } from 'drizzle-orm'
import { FastifyReply, FastifyRequest } from 'fastify'

export const getCities = async (
  request: FastifyRequest<{ Querystring: BASE_MODEL_QUERY_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { cityRepository } = request.diScope.cradle

  const cities = await cityRepository.findMany(request.query)

  reply.status(200).send(cities)
}

export const getCity = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { cityRepository } = request.diScope.cradle

  const result = await cityRepository.findOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(200).send(result.value)
}

export const getCitiesWithJobsCount = async (
  request: FastifyRequest<{ Querystring: BASE_MODEL_QUERY_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { cityRepository } = request.diScope.cradle

  const citiesWithJobsCount = await cityRepository.findManyWithJobsCount(
    request.query,
  )

  return reply.status(200).send(citiesWithJobsCount)
}

export const getCityJobs = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Querystring: JOB_FILTERS_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { cityRepository, jobRepository } = request.diScope.cradle

  const isExist = await cityRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const result = await jobRepository.findJobsBy({
    where: eq(jobs.cityId, id),
    query: request.query,
  })

  return reply.status(200).send(result)
}

export const getCityJobsAvgSalary = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Querystring: JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { currency, period } = request.query
  const { cityRepository, jobRepository } = request.diScope.cradle

  const isExist = await cityRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const avg = await jobRepository.findAvgSalaryBy({
    where: eq(jobs.cityId, id),
    currency,
    period,
  })

  return reply.status(200).send(avg)
}

export const createCity = async (
  request: FastifyRequest<{ Body: CREATE_CITY_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { cityRepository } = request.diScope.cradle

  const result = await cityRepository.createOne(request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.status(201).send(result.value)
}

export const deleteCity = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { cityRepository } = request.diScope.cradle

  const isExist = await cityRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const result = await cityRepository.deleteOne(id)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.code(200).send(result.value)
}

export const updateCity = async (
  request: FastifyRequest<{
    Params: GET_BY_ID_SCHEMA_TYPE
    Body: CREATE_CITY_SCHEMA_TYPE
  }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { cityRepository } = request.diScope.cradle

  const isExist = await cityRepository.findOne(id)

  if (!isExist.success) {
    const { status, message } = isExist.error

    return reply.status(status).send({ message })
  }

  const result = await cityRepository.updateOne(id, request.body)

  if (!result.success) {
    const { status, message } = result.error

    return reply.status(status).send({ message })
  }

  return reply.code(200).send(result.value)
}
