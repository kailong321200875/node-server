// 用户接口控制器
import userService from '../service/user.service'
import { Context } from 'koa'

const { createUser } = userService

class UserController {
  async register(ctx: Context) {
    console.log(ctx.request.body)

    const { user_name, password } = ctx.request.body

    const res = await createUser(user_name, password)
    console.log(res)

    ctx.body = ctx.request.body
  }

  async login(ctx: Context) {
    ctx.body = '登录成功'
  }
}

export default new UserController()
