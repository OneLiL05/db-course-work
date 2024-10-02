import { Routes } from './routes.js'

export const getBaseRoutes = (): { routes: Routes } => {
  return {
    routes: [
      {
        method: 'GET',
        url: '/ping',
        handler: (req, reply) => {
          reply.code(200).send({ message: 'pong' })
        },
      },
    ],
  }
}
