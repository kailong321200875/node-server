// 用户接口路由
// 导入路由
import Router from '@koa/router'
import userController from '../controller/user.controller'
const { register, login } = userController

// 实例化路由
const router = new Router({
  prefix: '/users'
})

// 注册接口
router.post('/register', register)

// 登录接口
router.post('/login', login)

export default router
