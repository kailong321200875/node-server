// 使用mongoose需要先定义Schema，可以理解为表结构的定义，此操作的对象应该和数据库表（集合）的字段一样
import mongoose from 'mongoose'
import { IUser } from './type'

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    length: 20,
    required: true,
    unique: true
  },
  password: {
    type: String,
    length: 20,
    required: true
  },
  // 是否为管理员，1 是管理员，0 不是管理员
  is_admin: {
    type: Number,
    min: 0,
    default: 0,
    max: 1,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  }
})

//创建模型
// model里的 参数 1:模型名称(首字母大写)，参数 2:定义的Schema, 参数 3:数据库表（集合）的名称)
const User = mongoose.model<IUser>('User', UserSchema, 'users')

// User.createCollection().then((collection) => {
//   console.log(collection)
//   console.log('Collection is created!');
// });

export default User
