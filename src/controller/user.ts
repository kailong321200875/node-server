// 用户接口控制器
import userService from '@/service/user'
import { Context } from 'koa'
import { IUserModel } from '@/model/user/types'
import { EErrorMessage } from '@/enum'
import { userRegisterError } from '@/constant/error'
import { EErrorCode } from '@/enum'
import md5 from 'js-md5'

const { createUser } = userService

class UserController {
  async register(ctx: Context) {
    const userInfo = ctx.request.body as IUserModel
    userInfo.password = md5(userInfo.password)
    try {
      const user = await createUser(userInfo)
      ctx.app.emit(
        'handler',
        {
          code: EErrorCode.SUCCESS,
          result: user,
          message: ' 注册成功'
        },
        ctx
      )
    } catch (error) {
      console.log(`${EErrorMessage.USER_REGISTER_ERROR}：`, error)
      return ctx.app.emit('handler', userRegisterError(), ctx)
    }
  }
}

export default new UserController()
