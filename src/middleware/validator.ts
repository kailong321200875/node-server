import { Context, Next } from 'koa'
import { userRegisterValidatorError } from '@/constant/error'
import Schema from 'async-validator'
import { useValidator } from '@/hooks/useValidator'
import { IUserModel } from '@/model/user/types'
import { EErrorMessage } from '@/enum'

const { required, lengthRange, notSpace } = useValidator()

// 注册参数验证
export const userRegisterValidator = async (ctx: Context, next: Next) => {
  const userInfo = ctx.request.body as IUserModel
  try {
    const validator = new Schema({
      user_name: [
        required('用户名不能为空'),
        {
          validator: (_, value, callback) =>
            lengthRange(value, callback, { min: 2, max: 20, message: '用户名长度必须在2-20之间' })
        },
        {
          validator: (_, value, callback) => notSpace(value, callback, '用户名不能有空格')
        }
      ],
      password: [
        required('密码不能为空'),
        {
          validator: (_, value, callback) =>
            lengthRange(value, callback, { min: 6, max: 20, message: '密码长度必须在6-20之间' })
        }
      ]
    })
    await validator.validate(userInfo)
  } catch (error) {
    const message = (error as any)['errors'].map((item: any) => item.message).join(',')
    console.log(`${EErrorMessage.USER_REGISTER_VALIDATOR_ERROR}：`, message)
    return ctx.app.emit('handler', userRegisterValidatorError(error, message), ctx)
  }

  await next()
}
