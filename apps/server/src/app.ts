import fastify, { FastifyInstance } from 'fastify'
import type http from 'node:http'
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { getRoutes } from './modules/routes.js'

type AppInstanse = FastifyInstance<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse
>

export const getApp = async (): Promise<AppInstanse> => {
  const app = fastify<http.Server, http.IncomingMessage, http.ServerResponse>({
    logger: true,
  })

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  await app.register(fastifyCors, {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    exposedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
    ],
  })

  await app.register(fastifyHelmet)

  app.after(() => {
    const { routes } = getRoutes()

    for (const route of routes) {
      app.withTypeProvider<ZodTypeProvider>().route(route)
    }
  })

  try {
    await app.ready()
  } catch (err) {
    app.log.error('Error while initializing app: ', err)
    throw err
  }

  return app
}
