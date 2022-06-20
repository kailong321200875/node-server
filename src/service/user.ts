import { IUserModel } from '@/model/user/types'
import User from '@/model/user'

// 用户接口操作数据库
class UserService {
  async createUser(userInfo: IUserModel) {
    // 插入数据
    const user = await User.create(userInfo)
    return user
  }
}

export default new UserService()
