import User from '@/model/user.model'
import { IUser } from '@/model/user.model/types'

// 用户接口操作数据库
class UserService {
  async createUser(user_name: string, password: string, is_admin: number) {
    // 插入数据
    const user = await User.create({
      user_name,
      password,
      is_admin
    })
    return user
  }

  async getUserInfo({ _id, user_name, password, is_admin }: Partial<ISchemaModel<IUser>>) {
    const whereOtp = {}
    _id && Object.assign(whereOtp, { _id })
    user_name && Object.assign(whereOtp, { user_name })
    password && Object.assign(whereOtp, { password })
    is_admin && Object.assign(whereOtp, { is_admin })

    const res = await User.findOne(whereOtp)

    return res ? res : null
  }

  async updateUserById({ _id, user_name, password, is_admin }: Partial<ISchemaModel<IUser>>) {
    const newUser = {
      _id
    }

    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    is_admin && Object.assign(newUser, { is_admin })

    const res = await User.updateOne(newUser)
    return res.acknowledged && res.matchedCount === 1 && res.modifiedCount === 1
  }
}

export default new UserService()
