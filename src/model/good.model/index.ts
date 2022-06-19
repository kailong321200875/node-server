// 使用mongoose需要先定义Schema，可以理解为表结构的定义，此操作的对象应该和数据库表（集合）的字段一样
import mongoose from 'mongoose'
import { IGood } from './types'
import { assignSchema, setTimestamps } from '@/utils'

const GoodSchema = new mongoose.Schema(
  assignSchema({
    goods_name: {
      type: String,
      required: true
    },
    goods_price: {
      type: Number,
      required: true
    },
    goods_num: {
      type: Number,
      default: 0
    },
    goods_img: {
      type: String,
      required: true
    }
  }),
  { ...setTimestamps() }
)

//创建模型
// model里的 参数 1:模型名称(首字母大写)，参数 2:定义的Schema, 参数 3:数据库表（集合）的名称)
const Good = mongoose.model<ISchemaModel<IGood>>('Good', GoodSchema, 'goods')

export default Good
