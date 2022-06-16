import Koa from 'koa'
// 中间件
import KoaBody from 'koa-body'

import userRouter from '@/router/user.router'

// 初始化koa
const app = new Koa()

app.use(KoaBody())
// 使用路由
app.use(userRouter.routes())

export default app
