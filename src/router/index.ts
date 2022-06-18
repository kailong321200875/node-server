import fs from 'fs'
import Router from '@koa/router'

const router = new Router()

fs.readdirSync(__dirname).forEach(async (file) => {
  if (file !== 'index.ts' && file !== 'README.md') {
    const r = await import(`./${file}`)
    router.use(r.default.routes())
  }
})

export default router
