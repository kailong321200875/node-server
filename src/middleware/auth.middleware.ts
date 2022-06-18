import { Context, Next } from 'koa'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import env from '@/config/config.default'
import { getResponse } from '@/utils/response'
import { IUser } from '@/model/user.model/types'

const { JWT_SECRET } = env

// 认证接口
export const auth = async (ctx: Context, next: Next) => {
  const { authorization = '' } = ctx.request.header
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

// 是否是管理员权限
export const hadAdminPermission = async (ctx: Context, next: Next) => {
  const { is_admin } = ctx.state.user as ISchemaModel<IUser>

  if (!is_admin) {
    console.error('没有管理员权限', ctx.state.user)
    ctx.app.emit(
      'handler',
      getResponse('fail', {
        message: '没有管理员权限'
      }),
      ctx
    )
    return
  }

  await next()
}
