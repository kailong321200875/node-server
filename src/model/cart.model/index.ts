// 使用mongoose需要先定义Schema，可以理解为表结构的定义，此操作的对象应该和数据库表（集合）的字段一样
import mongoose from 'mongoose'
import { ICart } from './/types'
import { assignSchema, setTimestamps } from '@/utils'
import Good from '@/model/good.model'

const CartSchema = new mongoose.Schema(
  assignSchema({
    user_id: {
      type: String,
      required: true
    },
    goods_id: {
      type: String,
      ref: Good,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      default: true
    }
  }),
  { ...setTimestamps() }
)

//创建模型
// model里的 参数 1:模型名称(首字母大写)，参数 2:定义的Schema, 参数 3:数据库表（集合）的名称)
const Cart = mongoose.model<ISchemaModel<ICart>>('Cart', CartSchema, 'carts')

export default Cart
