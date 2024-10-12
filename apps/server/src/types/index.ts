import type postgres from 'postgres'
import { envSchema } from '../env.js'
import { z } from 'zod'
import { CommonDependencies } from 'interfaces/index.js'
import { Resolver } from 'awilix'
import type http from 'node:http'
import { FastifyInstance, RouteOptions } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

type Environment = z.infer<typeof envSchema>

type AppInstanse = FastifyInstance<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse
>

export type Route = RouteOptions<
  http.Server,
  http.IncomingMessage,
  http.ServerResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  ZodTypeProvider
>

type SqlClient = postgres.Sql

type InjectableDependencies<T> = T & CommonDependencies

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseDiConfig<T> = Record<keyof T, Resolver<any>>

type Role = 'user' | 'employer' | 'admin'

export type {
  Environment,
  SqlClient,
  InjectableDependencies,
  BaseDiConfig,
  AppInstanse,
  Role,
}
