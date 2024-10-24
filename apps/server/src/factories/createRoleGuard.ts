import { Role } from '@skill-swap/shared'
import { FastifyRequest, FastifyReply } from 'fastify'

export const createRoleGuard = (roles: Role[]) => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const user = request.user

    if (!user) {
      return reply.status(401).send({ message: 'Authentification required' })
    }

    if (!roles.some((role) => user.roles.includes(role))) {
      return reply.status(401).send({ message: 'Access denied' })
    }
  }
}
