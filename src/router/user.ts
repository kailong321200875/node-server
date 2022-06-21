// 用户接口路由
import Router from '@koa/router'
import { userRegisterValidator } from '@/middleware/validator'
// import userController from '@/controller/user'

// const { register, login, changePassword } = userController

// 实例化路由
const router = new Router({
  prefix: '/user'
})

router.post('/register', userRegisterValidator)

export default router
