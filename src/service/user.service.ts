import User from '@/model/user.model'

// 用户接口操作数据库
class UserService {
  async createUser(user_name: string, password: string) {
    // 插入数据
    const user = await User.create({
      user_name,
      password
    })
    console.log(user)
    return user
  }
}

export default new UserService()
