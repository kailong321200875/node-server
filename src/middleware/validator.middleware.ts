import { Context, Next } from 'koa'
import { getResponse } from '@/utils/response'

export const validator = async (ctx: Context, next: Next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true }
    })
  } catch (error) {
    console.log('商品格式错误：', error)
    ctx.app.emit(
      'handler',
      getResponse('fail', {
        message: '商品格式错误',
        result: error
      }),
      ctx
    )
    return
  }

  await next()
}
