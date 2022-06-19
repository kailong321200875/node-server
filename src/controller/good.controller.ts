import { Context, Next } from 'koa'
import { getResponse } from '@/utils/response'
import path from 'path'
import GoodService from '@/service/good.service'

const { createGood, updateGood, deleteGood, findGoods } = GoodService

class GoodsController {
  async upload(ctx: Context, next: Next) {
    const file = ctx.request.files?.file
    const fileTypes = ['image/jpeg', 'image/jpg', 'image/png']

    if (file) {
      if (!fileTypes.includes(file['mimetype'])) {
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

  async create(ctx: Context, next: Next) {
    try {
      const good = await createGood(ctx.request.body)
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '商品入库成功',
          result: {
            data: good
          }
        }),
        ctx
      )
    } catch (error) {
      console.error('商品入库失败', error)
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '商品入库失败'
        }),
        ctx
      )
      return
    }

    await next()
  }

  async update(ctx: Context, next: Next) {
    try {
      const res = await updateGood(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.app.emit(
          'handler',
          getResponse('success', {
            message: '商品修改成功'
          }),
          ctx
        )
      } else {
        ctx.app.emit(
          'handler',
          getResponse('fail', {
            message: '商品修改失败'
          }),
          ctx
        )
      }
    } catch (error) {
      console.error('商品更新未知错误', error)
      ctx.app.emit(
        'handler',
        getResponse('error', {
          error
        }),
        ctx
      )
      return
    }
    await next()
  }

  async deleteGood(ctx: Context, next: Next) {
    try {
      const res = await deleteGood(ctx.params.id)
      if (res) {
        ctx.app.emit(
          'handler',
          getResponse('success', {
            message: '商品删除成功'
          }),
          ctx
        )
      } else {
        ctx.app.emit(
          'handler',
          getResponse('fail', {
            message: '商品删除失败'
          }),
          ctx
        )
      }
    } catch (error) {
      console.error('商品删除未知错误', error)
      ctx.app.emit(
        'handler',
        getResponse('error', {
          error
        }),
        ctx
      )
      return
    }
    await next()
  }

  async findAll(ctx: Context, next: Next) {
    const pageNumber = parseInt((ctx.request.query.pageNumber as string) || '1')
    const pageSize = parseInt((ctx.request.query.pageSize as string) || '10')
    try {
      const goods = await findGoods(pageNumber, pageSize)
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '商品查询成功',
          result: {
            data: goods
          }
        }),
        ctx
      )
    } catch (error) {
      console.error('商品查询未知错误', error)
      ctx.app.emit(
        'handler',
        getResponse('error', {
          error
        }),
        ctx
      )
      return
    }
    await next()
  }
}

export default new GoodsController()
