import { Context, Next } from 'koa'
import { getResponse } from '@/utils/response'
import CartService from '@/service/cart.service'
import { IUser } from '@/model/user.model/types'

const { createOrUpdate, findCarts, updateCart, removeCart, selectAllCart } = CartService

class CartController {
  async create(ctx: Context, next: Next) {
    const { _id } = ctx.state.user as ISchemaModel<IUser>
    const { goods_id } = ctx.request.body

    try {
      const res = await createOrUpdate(_id as string, goods_id)
      if (res) {
        ctx.app.emit(
          'handler',
          getResponse('success', {
            message: '添加购物车成功',
            result: {
              data: res
            }
          }),
          ctx
        )
      } else {
        console.error('添加购物车失败')
        ctx.app.emit('handler', getResponse('fail', { message: '添加购物车失败' }), ctx)
      }
    } catch (error) {
      console.error('添加购物车失败', error)
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '添加购物车失败'
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
      const carts = await findCarts(pageNumber, pageSize)
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '获取购物车列表成功',
          result: {
            data: carts
          }
        }),
        ctx
      )
    } catch (error) {
      console.error('获取购物车列表失败', error)
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '获取购物车列表失败'
        }),
        ctx
      )
      return
    }
    await next()
  }

  async update(ctx: Context, next: Next) {
    const { id } = ctx.params
    const { number, selected } = ctx.request.body

    if (number === void 0 && selected === void 0) {
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '更新购物车失败'
        }),
        ctx
      )
      return
    }

    const res = await updateCart({ id, number, selected })

    if (res) {
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '更新购物车成功',
          result: {
            data: res
          }
        }),
        ctx
      )
    }

    await next()
  }

  async remove(ctx: Context, next: Next) {
    const { ids } = ctx.request.body

    try {
      const res = await removeCart(ids)
      if (res) {
        ctx.app.emit(
          'handler',
          getResponse('success', {
            message: '删除购物车成功',
            result: {
              data: res
            }
          }),
          ctx
        )
      } else {
        console.error('删除购物车失败')
        ctx.app.emit('handler', getResponse('fail', { message: '删除购物车失败' }), ctx)
      }
    } catch (error) {
      console.error('删除购物车失败', error)
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '删除购物车失败'
        }),
        ctx
      )
      return
    }
    await next()
  }

  async selectAll(ctx: Context, next: Next) {
    const user_id = ctx.state.user._id
    const res = await selectAllCart(user_id, true)

    try {
      if (res) {
        ctx.app.emit(
          'handler',
          getResponse('success', {
            message: '全选购物车成功',
            result: {
              data: res
            }
          }),
          ctx
        )
      } else {
        console.error('全选购物车失败')
        ctx.app.emit('handler', getResponse('fail', { message: '全选购物车失败' }), ctx)
      }
    } catch (error) {
      console.error('全选购物车失败', error)
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '全选购物车失败'
        }),
        ctx
      )
      return
    }

    await next()
  }

  async unselectAll(ctx: Context, next: Next) {
    const user_id = ctx.state.user._id
    const res = await selectAllCart(user_id, false)

    try {
      if (res) {
        ctx.app.emit(
          'handler',
          getResponse('success', {
            message: '全不选购物车成功',
            result: {
              data: res
            }
          }),
          ctx
        )
      } else {
        console.error('全不选购物车失败')
        ctx.app.emit('handler', getResponse('fail', { message: '全不选购物车失败' }), ctx)
      }
    } catch (error) {
      console.error('全不选购物车失败', error)
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '全不选购物车失败'
        }),
        ctx
      )
      return
    }

    await next()
  }
}

export default new CartController()
