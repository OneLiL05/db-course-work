import { FastifyReply, FastifyRequest } from 'fastify'
import { LOGIN_SCHEMA_TYPE } from '../schema/index.js'
import { CreateUser } from 'modules/users/schemas/index.js'
import { JwtPayload } from '../interfaces/index.js'
import { ACCESS_TOKEN } from 'constants/auth.js'

export const login = async (
  request: FastifyRequest<{ Body: LOGIN_SCHEMA_TYPE }>,
  reply: FastifyReply,
): Promise<void> => {
  const { email, password } = request.body
  const { authService, userRepository } = request.diScope.cradle

  const user = await userRepository.findOneByEmail(email)

  if (!user) {
    return reply.status(400).send({ message: 'Invalid email or password' })
  }

  const isPasswordMatch = await authService.verifyPassword(
    password,
    user.password,
  )

  if (!isPasswordMatch) {
    return reply.status(400).send({ message: 'Invalid email or password' })
  }

  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.roles,
  }

  const token = request.jwt.sign(payload)

  reply.setCookie(ACCESS_TOKEN, token, {
    path: '/',
    httpOnly: true,
    secure: true,
  })

  return reply.status(200).send({ [ACCESS_TOKEN]: token })
}

export const signup = async (
  request: FastifyRequest<{ Body: CreateUser }>,
  reply: FastifyReply,
): Promise<void> => {
  const { email, password } = request.body
  const { authService, userRepository } = request.diScope.cradle

  const isExist = await userRepository.findOneByEmail(email)

  if (isExist) {
    return reply
      .status(400)
      .send({ message: 'User with such email already exists' })
  }

  const hashedPassword = await authService.generateHash(password)

  const user = await userRepository.createOne({
    ...request.body,
    password: hashedPassword,
  })

  return reply.status(201).send(user)
}

export const logout = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  reply.clearCookie(ACCESS_TOKEN)

  return reply.send({ message: 'Logout successful' })
}
