// 导入路由
const Router = require('@koa/router')

const { register, login } = require('../controller/user.controller')
console.log(register)

// 实例化路由
const router = new Router({
  prefix: '/users'
})

// 注册接口
router.post('/register', register)

// 登录接口
router.post('/login', login)

module.exports = router
