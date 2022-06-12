const Koa = require('koa')

// 导出默认的环境变量
const { APP_PORT } = require('./config/config.default')
const userRouter = require('./router/user.router')

// 初始化koa
const app = new Koa()

// 使用路由
app.use(userRouter.routes())

// 监听服务器端口初始化
app.listen(APP_PORT, () => {
  console.log(`listening on port ${APP_PORT}`)
})
