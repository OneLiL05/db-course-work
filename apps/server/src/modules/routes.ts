import type http from 'node:http'
import type { RouteOptions } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { getBaseRoutes } from './index.js'

export type Routes = RouteOptions<
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
>[]

export const getRoutes = (): { routes: Routes } => {
  const { routes: baseRoutes } = getBaseRoutes()

  return {
    routes: [...baseRoutes],
  }
}
