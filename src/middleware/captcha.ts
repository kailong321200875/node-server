import { Context, Next } from 'koa'
import svgCaptcha from 'svg-captcha'
import { EErrorCode } from '@/enum'

export const createCaptcha = async (ctx: Context, next: Next) => {
  const captcha = svgCaptcha.create()

  // 保存生成的验证码结果
  ctx.state.code = captcha.text

  // 设置响应头
  ctx.response.type = 'image/svg+xml'

  ctx.app.emit(
    'handler',
    {
      code: EErrorCode.SUCCESS,
      result: captcha.data
    },
    ctx
  )

  await next()
}
