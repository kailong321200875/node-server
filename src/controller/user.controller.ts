// 用户接口控制器
import userService from '@/service/user.service'
import { Context } from 'koa'
import { getResponse } from '@/utils/response'
import { IUser } from '@/model/user.model/types'
import jwt from 'jsonwebtoken'
import env from '@/config/config.default'

const { JWT_SECRET, EXPIRES_IN } = env

const { createUser, updateUserById } = userService

class UserController {
  async register(ctx: Context) {
    const { user_name, password, is_admin } = ctx.request.body as IUser

    try {
      const res = await createUser(user_name, password, is_admin)
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
    try {
      const user = ctx.state.user as ISchemaModel<IUser>
      if (user) {
        const token = jwt.sign(user.toJSON(), JWT_SECRET, {
          // token过期时间
          expiresIn: EXPIRES_IN
        })
        ctx.app.emit(
          'handler',
          getResponse('success', {
            message: '登录成功',
            result: {
              data: Object.assign(user.toJSON(), {
                token,
                password: ''
              })
            }
          }),
          ctx
        )
      }
      return
    } catch (error) {
      console.error('用户登录未知错误：', error)
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

  async changePassword(ctx: Context) {
    const id = ctx.state.user._id
    const { password } = ctx.request.body as IUser
    const res = await updateUserById({ id, password })
    if (res) {
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '修改密码成功'
        }),
        ctx
      )
    } else {
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '修改密码失败'
        }),
        ctx
      )
    }
  }
}

export default new UserController()
