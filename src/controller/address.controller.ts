import { Context, Next } from 'koa'
import { getResponse } from '@/utils/response'
import AddressService from '@/service/address.service'

const { create, addressList } = AddressService

class AddressController {
  async create(ctx: Context, next: Next) {
    const id = ctx.state.user._id
    const { address, phone, consignee } = ctx.request.body
    const result = await create({ id, address, phone, consignee })
    if (result) {
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '新增地址成功',
          result
        }),
        ctx
      )
    } else {
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '新增地址失败'
        }),
        ctx
      )
    }
    await next()
  }

  async addressList(ctx: Context, next: Next) {
    const id = ctx.state.user._id
    const result = await addressList(id)
    if (result) {
      ctx.app.emit(
        'handler',
        getResponse('success', {
          message: '获取地址列表成功',
          result
        }),
        ctx
      )
    } else {
      ctx.app.emit(
        'handler',
        getResponse('fail', {
          message: '获取地址列表失败'
        }),
        ctx
      )
      return
    }
    await next()
  }
}

export default new AddressController()
