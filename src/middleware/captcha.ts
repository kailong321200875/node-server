import { Context, Next } from 'koa'
import svgCaptcha from 'svg-captcha'
import { EErrorCode } from '@/enum'
// import session from 'koa-session'

export const createCaptcha = async (ctx: Context, next: Next) => {
  const captcha = svgCaptcha.create({
    height: 38
  })

  // 保存生成的验证码结果
  ctx.state.code = captcha.text
  console.log(ctx.state.code)

  // 设置响应头
  ctx.response.type = 'image/svg+xml'

  ctx.app.emit(
    'handler',
    {
      code: EErrorCode.SUCCESS,
      result: captcha.data,
      message: '获取验证码成功'
    },
    ctx
  )

  await next()
}
