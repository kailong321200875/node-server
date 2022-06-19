import Router from '@koa/router'
import AddressController from '@/controller/address.controller'
import { auth } from '@/middleware/auth.middleware'
import { validator } from '@/middleware/address.middleware'

const { create, addressList } = AddressController

const router = new Router({
  prefix: '/address'
})

// 新增地址
router.post(
  '/add',
  auth,
  validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1[3456789]\d{9}$/ },
    address: 'string'
  }),
  create
)

// 获取地址列表
router.get('/list', auth, addressList)

export default router
