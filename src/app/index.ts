import Koa from 'koa'
// 中间件
import KoaBody from 'koa-body'
import router from '@/router'
import { handler } from '@/utils'
import path from 'path'
import koaStatic from 'koa-static'

// 初始化koa
const app = new Koa()

app
  .use(
    KoaBody({
      // 允许上传文件
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
      },
      parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
    })
  )
  .use(koaStatic(path.join(__dirname, '../upload')))
  .use(router.routes())
  .use(router.allowedMethods())
  .on('handler', handler)

export default app
