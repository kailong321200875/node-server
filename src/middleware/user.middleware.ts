import { Context, Next } from 'koa'
import userService from '@/service/user.service'
import { getResponse } from '@/utils/response'
import { IUser } from '@/model/user.model/types'
import bcrypt from 'bcryptjs'

const { getUserInfo } = userService

export const userValidator = async (ctx: Context, next: Next) => {
  const { user_name, password } = ctx.request.body as IUser

  // 如果用户名或密码为空
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit(
      'handler',
      getResponse('fail', {
        message: '用户名或密码为空'
      }),
      ctx
    )
    return
  }

  await next()
}

export const userLengthValidator = async (ctx: Context, next: Next) => {
  const { user_name, password } = ctx.request.body as IUser

  // 长度验证
  if (user_name.length > 20 || password.length > 20) {
    console.error('用户名或密码长度超过20', ctx.request.body)
    ctx.app.emit(
      'handler',
      getResponse('fail', {
        message: '用户名或密码长度超过20'
      }),
      ctx
    )
    return
  }

  await next()
}

export const verifyUser = async (ctx: Context, next: Next) => {
  const { user_name } = ctx.request.body as IUser
  const userInfo = await getUserInfo({ user_name })

  // 验证用户名是否已存在
  if (userInfo) {
    console.error('用户已存在', ctx.request.body)
    ctx.app.emit(
      'handler',
      getResponse('fail', {
        message: '用户已存在'
      }),
      ctx
    )
    return
  }

  await next()
}

export const cryptPassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body as IUser
  const salt = await bcrypt.genSalt(10)
  //  加密密码
  const hash = await bcrypt.hash(password, salt)
  ctx.request.body.password = hash

  await next()
}

export const verifyLogin = async (ctx: Context, next: Next) => {
  const { user_name, password } = ctx.request.body as IUser
  const userInfo = await getUserInfo({ user_name })

  // 验证用户名是否已存在
  if (!userInfo) {
    console.error('用户不存在', ctx.request.body)
    ctx.app.emit(
      'handler',
      getResponse('fail', {
        message: '用户不存在'
      }),
      ctx
    )
    return
  }

  // 判断密码是否正确
  if (bcrypt.compareSync(password, userInfo.password)) {
    const user = Object.assign(userInfo, { password: '' })
    ctx.state.user = Object.assign(userInfo, { password: '' })
    ctx.app.emit(
      'handler',
      getResponse('success', {
        message: '登录成功',
        result: {
          data: user
        }
      }),
      ctx
    )
  } else {
    console.error('密码错误', ctx.request.body)
    ctx.app.emit(
      'handler',
      getResponse('fail', {
        message: '密码错误'
      }),
      ctx
    )
    return
  }

  await next()
}
