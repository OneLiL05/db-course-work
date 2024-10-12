import { ACCESS_TOKEN } from 'constants/auth.js'
import { FastifyReply, FastifyRequest } from 'fastify'
import { JwtPayload } from 'modules/auth/interfaces/index.js'

export const tokenGuard = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const token = request.cookies[ACCESS_TOKEN]

  if (!token) {
    return reply.status(401).send({ message: 'Authentification required' })
  }

  const decoded = request.jwt.decode<JwtPayload>(token)

  if (!decoded) {
    return reply.status(401).send({ message: 'Authentification required' })
  }

  request.user = decoded
}
