// 使用mongoose需要先定义Schema，可以理解为表结构的定义，此操作的对象应该和数据库表（集合）的字段一样
import mongoose from 'mongoose'
import { IUserModel } from './types'

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    check_password: {
      type: String,
      required: true
    },
    // 是否为管理员，1 是管理员，0 不是管理员
    is_admin: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

//创建模型
// model里的 参数 1:模型名称(首字母大写)，参数 2:定义的Schema, 参数 3:数据库表（集合）的名称)
const User = mongoose.model<IUserModel>('User', UserSchema, 'users')

export default User
