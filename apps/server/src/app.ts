import { fastifyAuth } from '@fastify/auth'
import { diContainer, fastifyAwilixPlugin } from '@fastify/awilix'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import { env } from 'env.js'
import fastify from 'fastify'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { tokenGuard } from 'guards/token.js'
import type http from 'node:http'
import { AppInstanse } from 'types/index.js'
import { registerDependenies } from './infrastructure/parentDiConfig.js'
import { getRoutes } from './modules/routes.js'

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

  await app.register(fastifyJwt, { secret: env.JWT_SECRET })

  await app.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
    hook: 'preHandler',
  })

  await app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    asyncDispose: true,
    asyncInit: true,
    eagerInject: true,
    disposeOnResponse: true,
  })

  app.decorate('authentificate', tokenGuard)

  app.addHook('preHandler', (req, res, next) => {
    req.jwt = app.jwt
    return next()
  })

  await app.register(fastifyAuth)

  registerDependenies(diContainer, { app })

  app.after(() => {
    const { routes } = getRoutes(app)

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
