// 用户接口路由
import Router from '@koa/router'
import userController from '@/controller/user.controller'
import {
  userValidator,
  userLengthValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
} from '@/middleware/user.middleware'
import { auth } from '@/middleware/auth.middleware'

const { register, login, changePassword } = userController

// 实例化路由
const router = new Router({
  prefix: '/users'
})

// 注册接口
router.post('/register', userValidator, verifyUser, userLengthValidator, cryptPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

// 修改密码接口
router.put('/changePassword', auth, cryptPassword, changePassword)

export default router
