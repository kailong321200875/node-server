import Router from '@koa/router'
import GoodController from '@/controller/good.controller'
import { auth, hadAdminPermission } from '@/middleware/auth.middleware'
import { validator } from '@/middleware/validator.middleware'

const { upload, create, update, deleteGood, findAll } = GoodController

const router = new Router({
  prefix: '/goods'
})

// 商品图片上传
router.post('/upload', auth, hadAdminPermission, upload)

// 商品发布
router.post('/publish', auth, hadAdminPermission, validator, create)

// 修改商品
router.put('/:id', auth, hadAdminPermission, validator, update)

// 删除商品
router.delete('/:id', auth, hadAdminPermission, deleteGood)

// 获取商品列表
router.get('/list', findAll)

export default router
