// 用户接口操作数据库
class UserService {
  async createUser(user_name: string, password: string) {
    console.log(user_name, password)
    // todo: 写入数据库
    return `写入数据库成功`
  }
}

export default new UserService()
