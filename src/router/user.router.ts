// 用户接口路由
import Router from '@koa/router'
import userController from '@/controller/user.controller'
import { userValidator, verifyUser, cryptPassword } from '@/middleware/user.middleware'

const { register, login } = userController

// 实例化路由
const router = new Router({
  prefix: '/users'
})

// 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)

// 登录接口
router.post('/login', login)

export default router
