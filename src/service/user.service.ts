import User from '@/model/user.model'
import { IUser } from '@/model/user.model/types'

// 用户接口操作数据库
class UserService {
  async createUser(user_name: string, password: string) {
    // 插入数据
    const user = await User.create({
      user_name,
      password
    })
    return user
  }

  async getUserInfo({ _id, user_name, password, is_admin }: Partial<ISchemaModel<IUser>>) {
    const whereObj = {}
    _id && Object.assign(whereObj, { _id })
    user_name && Object.assign(whereObj, { user_name })
    password && Object.assign(whereObj, { password })
    is_admin && Object.assign(whereObj, { is_admin })

    const res = await User.findOne(whereObj)

    return res ? res : null
  }
}

export default new UserService()
