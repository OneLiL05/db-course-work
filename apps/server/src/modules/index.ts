import { Routes } from 'interfaces/config.js'

export const getBaseRoutes = (): Routes => {
  return {
    routes: [
      {
        method: 'GET',
        url: '/ping',
        handler: async (req, reply) => {
          reply.code(200).send({ message: 'pong' })
        },
      },
    ],
  }
}
