import { Context, Next } from 'koa'
import { getResponse } from '@/utils/response'
import path from 'path'

class GoodsController {
  async upload(ctx: Context, next: Next) {
    const file = ctx.request.files?.file
    const fileTypes = ['image/jpeg', 'image/png']

    if (file) {
      if (!fileTypes.includes(file['type'])) {
        ctx.app.emit(
          'handler',
          getResponse('fail', {
            message: '文件类型错误'
          }),
          ctx
        )
        return
      }
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '上传成功',
          result: {
            data: {
              url: path.basename(file['filepath'])
            }
          }
        }),
        ctx
      )
    } else {
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '上传失败'
        }),
        ctx
      )
      return
    }

    await next()
  }
}

export default new GoodsController()
