const Koa = require('koa')

const userRouter = require('../router/user.router')

// 初始化koa
const app = new Koa()

// 使用路由
app.use(userRouter.routes())

module.exports = app
