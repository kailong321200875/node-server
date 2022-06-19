import { Context, Next } from 'koa'
import { getResponse } from '@/utils/response'

export const validator = (rules: any) => {
  return async (ctx: Context, next: Next) => {
    try {
      ctx.verifyParams(rules)
    } catch (error) {
      console.log('购物车格式错误', error)
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '购物车格式错误',
          result: error
        }),
        ctx
      )
      return
    }
    await next()
  }
}
