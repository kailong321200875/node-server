// 导入路由
const Router = require('@koa/router')

// 实例化路由
const router = new Router({
  prefix: '/users'
})

router.get('/', (ctx) => {
  ctx.body = 'hello User'
})

module.exports = router
