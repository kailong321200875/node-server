import fs from 'fs'
import Router from '@koa/router'

const router = new Router()

// 加载所有的路由
fs.readdirSync(__dirname).forEach(async (file) => {
  if (file === 'index.ts') return
  const r = await import(`./${file}`)
  router.use(r.default.routes())
})

export default router
