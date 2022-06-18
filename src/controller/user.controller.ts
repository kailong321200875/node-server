// 用户接口控制器
import userService from '@/service/user.service'
import { Context } from 'koa'
import { getResponse } from '@/utils/response'
import { IUser } from '@/model/user.model/types'

const { createUser } = userService

class UserController {
  async register(ctx: Context) {
    const { user_name, password } = ctx.request.body as IUser

    try {
      const res = await createUser(user_name, password)
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '注册成功',
          result: { data: Object.assign(res, { password: '' }) }
        }),
        ctx
      )
    } catch (error) {
      console.error('用户注册未知错误：', error)
      ctx.app.emit(
        'handler',
        getResponse('error', {
          error
        }),
        ctx
      )
      return
    }
  }

  async login(ctx: Context) {
    ctx.body = '登录成功'
  }
}

export default new UserController()
