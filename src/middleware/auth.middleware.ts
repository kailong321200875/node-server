import { Context, Next } from 'koa'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import env from '@/config/config.default'
import { getResponse } from '@/utils/response'

const { JWT_SECRET } = env

export const auth = async (ctx: Context, next: Next) => {
  const { authorization } = ctx.request.header
  const token = authorization?.split(' ')[1] as string

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    const err = error as JsonWebTokenError
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token过期', err)
        ctx.app.emit(
          'handler',
          getResponse('auth', {
            message: 'token过期'
          }),
          ctx
        )
        return
      case 'JsonWebTokenError':
        console.error('token错误', err)
        ctx.app.emit(
          'handler',
          getResponse('auth', {
            message: 'token错误'
          }),
          ctx
        )
        return
      default:
        break
    }
  }

  await next()
}
