import Good from '@/model/good.model'
import { IGood } from '@/model/good.model/types'
import { isValidObjectId } from 'mongoose'

class GoodService {
  async createGood(goods: IGood) {
    const good = await Good.create(goods)
    return good
  }

  async updateGood(id: string, goods: IGood) {
    if (!isValidObjectId(id)) {
      return false
    }
    const res = await Good.updateOne({ _id: id }, { ...goods })
    return res.acknowledged && res.matchedCount === 1 && res.modifiedCount === 1
  }

  async deleteGood(id: string) {
    if (!isValidObjectId(id)) {
      return false
    }
    const res = await Good.deleteOne({ _id: id })
    console.log(res)
    return res.acknowledged && res.deletedCount === 1
  }

  async findGoods(pageNumber = 1, pageSize = 10) {
    // 获取总数
    const total = await Good.countDocuments()

    // 获取分页数据
    const goods = await Good.find()
      .skip((Number(pageNumber) - 1) * Number(pageSize))
      .limit(Number(pageSize))
      .sort({ _id: -1 })

    return {
      total,
      pageNumber,
      pageSize,
      list: goods
    }
  }
}

export default new GoodService()
