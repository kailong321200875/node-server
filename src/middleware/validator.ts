import { Context, Next } from 'koa'
import { userRegisterValidatorError } from '@/constant/error'
import Schema from 'async-validator'

// 注册参数验证
export const userRegisterValidator = async (ctx: Context, next: Next) => {
  try {
    new Schema({
      user_name: [
        {
          required: true,
          message: '用户名不能为空'
        },
        {
          validator: (_, value, callback) => {
            if (value.length < 3 || value.length > 20) {
              callback(new Error('用户名长度必须在3-20之间'))
            } else {
              callback()
            }
          }
        },
        {
          validator: (_, value, callback) => {
            // 用户名不能有空格
            if (value.indexOf(' ') !== -1) {
              callback(new Error('用户名不能有空格'))
            } else {
              callback()
            }
          }
        }
      ]
    })
    // await validator.validate(ctx.request.body, {
    //   first: true
    // })
  } catch (error) {
    console.log(`${EErrorMessage.USER_REGISTER_VALIDATOR_ERROR}：`, error)
    ctx.app.emit('error', userRegisterValidatorError, ctx)
    return
  }

  await next()
}
