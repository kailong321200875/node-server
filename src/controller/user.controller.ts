// 用户接口控制器
import userService from '@/service/user.service'
import { Context } from 'koa'

const { createUser } = userService

class UserController {
  async register(ctx: Context) {
    const { user_name, password } = ctx.request.body

    const res = await createUser(user_name, password)

    ctx.body = res
  }

  async login(ctx: Context) {
    ctx.body = '登录成功'
  }
}

export default new UserController()
