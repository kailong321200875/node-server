import { Context, Next } from 'koa'
import svgCaptcha from 'svg-captcha'
import { EErrorCode } from '@/enum'
import { v4 as uuidv4 } from 'uuid'
import ussCache from '@/hooks/useCache'

const { setCache } = ussCache()

export const createCaptcha = async (ctx: Context, next: Next) => {
  const captcha = svgCaptcha.create({
    height: 38
  })

  const uuid = uuidv4()

  setCache(uuid, captcha.text, 300)

  // 设置响应头
  ctx.response.type = 'image/svg+xml'

  ctx.app.emit(
    'handler',
    {
      code: EErrorCode.SUCCESS,
      result: {
        url: captcha.data,
        uuid
      },
      message: '获取验证码成功'
    },
    ctx
  )

  await next()
}
