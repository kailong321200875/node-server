// 用户接口控制器
const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    console.log(ctx.request.body)

    const { user_name, password } = ctx.request.body

    const res = await createUser(user_name, password)
    console.log(res)

    ctx.body = ctx.request.body
  }

  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()
