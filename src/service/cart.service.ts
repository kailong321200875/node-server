import Cart from '@/model/cart.model'
import { isValidObjectId } from 'mongoose'

class CartSerive {
  async createOrUpdate(user_id: string, goods_id: string) {
    // 根据user_id和goods_id查询购物车是否存在
    const res = await Cart.findOne({ user_id, goods_id })
    if (res) {
      const number = (res.number as number) + 1
      const result = await Cart.updateOne({ _id: res._id }, { number })
      if (result.acknowledged && result.modifiedCount === 1 && result.matchedCount === 1) {
        return await Cart.findOne({ _id: res._id })
      } else {
        return null
      }
    } else {
      return await Cart.create({ user_id, goods_id, number: 1 })
    }
  }

  async findCarts(pageNumber = 1, pageSize = 10) {
    // 获取总数
    const total = await Cart.countDocuments()
    console.log(total)

    // 获取分页数据
    // TODo 字段别名

    const carts = await Cart.find(
      {},
      {
        user_id: 1,
        number: 1,
        selected: 1
      }
    )
      .skip((Number(pageNumber) - 1) * Number(pageSize))
      .limit(Number(pageSize))
      .sort({ _id: -1 })
      .populate('goods_id', 'goods_name goods_price goods_img goods_num')

    console.log(carts)
    return {
      total,
      pageNumber,
      pageSize,
      list: carts
    }
  }

  async updateCart(params: {
    id: string
    number: number | undefined
    selected: boolean | undefined
  }) {
    const { id, number, selected } = params
    if (!isValidObjectId(id)) {
      return null
    }

    const res = await Cart.findOne({ _id: id })
    if (!res) {
      return null
    }
    number !== void 0 && (res.number = number)
    selected !== void 0 && (res.selected = selected)

    return res.save()
  }

  async removeCart(ids: string[]) {
    const res = await Cart.deleteMany({ _id: { $in: ids } })
    return res.acknowledged
  }

  async selectAllCart(user_id: string, selected: boolean) {
    const res = await Cart.updateMany({ user_id }, { selected })
    return res.acknowledged
  }
}

export default new CartSerive()
