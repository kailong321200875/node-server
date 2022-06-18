import Router from '@koa/router'
import GoodsController from '@/controller/goods.controller'
import { auth, hadAdminPermission } from '@/middleware/auth.middleware'

const { upload } = GoodsController

const router = new Router({
  prefix: '/goods'
})

router.post('/upload', auth, hadAdminPermission, upload)

export default router
