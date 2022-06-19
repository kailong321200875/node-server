// 使用mongoose需要先定义Schema，可以理解为表结构的定义，此操作的对象应该和数据库表（集合）的字段一样
import mongoose from 'mongoose'
import { IAddress } from './types'
import { assignSchema, setTimestamps } from '@/utils'

const AddressSchema = new mongoose.Schema(
  assignSchema({
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    is_default: {
      type: Boolean,
      default: false,
      required: false
    },
    consignee: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    }
  }),
  { ...setTimestamps() }
)

//创建模型
// model里的 参数 1:模型名称(首字母大写)，参数 2:定义的Schema, 参数 3:数据库表（集合）的名称)
const Address = mongoose.model<ISchemaModel<IAddress>>('Address', AddressSchema, 'addresses')

export default Address
