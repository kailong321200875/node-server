// 用户接口路由
import Router from '@koa/router'
import { userRegisterValidator } from '@/middleware/validator'
import { createCaptcha } from '@/middleware/captcha'
import userController from '@/controller/user'

const { register } = userController

// 实例化路由
const router = new Router({
  prefix: '/user'
})

router.post('/register', userRegisterValidator, register)

router.get('/captcha', createCaptcha)

export default router
