import { jobs, jobsView } from '@skill-swap/db'
import {
  BASE_MODEL_QUERY_TYPE,
  CREATE_CITY_SCHEMA_TYPE,
  GET_BY_ID_SCHEMA_TYPE,
  JOBS_AVG_SALARY_QUERY_SCHEMA_TYPE,
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

export const getCityJobs = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { cityRepository, jobRepository } = request.diScope.cradle

  const isExist = await cityRepository.findOne(id)

  if (!isExist) {
    return reply.status(404).send({ message: 'City with such id not found' })
  }

  const jobs = await jobRepository.findJobsBy(eq(jobsView.cityId, id))

  return reply.status(200).send(jobs)
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

  if (!isExist) {
    return reply.status(404).send({ message: 'City with such id not found' })
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

  const city = await cityRepository.createOne(request.body)

  if (!city) {
    return reply.status(500).send({ message: 'City creation failed' })
  }

  return reply.status(201).send(city)
}

export const deleteCity = async (
  request: FastifyRequest<{ Params: GET_BY_ID_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { id } = request.params
  const { cityRepository } = request.diScope.cradle

  const isExist = await cityRepository.findOne(id)

  if (!isExist) {
    return reply.status(404).send({ message: 'City with such id not found' })
  }

  const city = await cityRepository.deleteOne(id)

  if (!city) {
    return reply.status(500).send({ message: 'City deletion failed' })
  }

  return reply.code(200).send(city)
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

  if (!isExist) {
    return reply.status(404).send({ message: 'City with such id not found' })
  }

  const city = await cityRepository.updateOne(id, request.body)

  if (!city) {
    return reply.status(500).send({ message: 'City update failed' })
  }

  return reply.code(200).send(city)
}
