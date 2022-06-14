const Koa = require('koa')
// 中间件
const KoaBody = require('koa-body')

const userRouter = require('../router/user.router')

// 初始化koa
const app = new Koa()

app.use(KoaBody())
// 使用路由
app.use(userRouter.routes())

module.exports = app
