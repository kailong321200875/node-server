import Koa from 'koa'
// 中间件
import KoaBody from 'koa-body'
import userRouter from '@/router/user.router'
import errorHandler from '@/utils/handler'

// 初始化koa
const app = new Koa()

app.use(KoaBody())
// 使用路由
app.use(userRouter.routes())

// 统一的事件处理
app.on('handler', errorHandler)

export default app
