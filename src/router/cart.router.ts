import Router from '@koa/router'
import { auth } from '@/middleware/auth.middleware'
import { validator } from '@/middleware/cart.middleware'
import CartController from '@/controller/cart.controller'

const { create, findAll, update, remove, selectAll, unselectAll } = CartController

const router = new Router({
  prefix: '/cart'
})

// 添加购物车
router.post(
  '/',
  auth,
  validator({
    goods_id: 'string'
  }),
  create
)

// 购物车列表
router.get('/list', auth, findAll)

// 更新购物车
router.patch(
  '/:id',
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'boolean', required: false }
  }),
  update
)

// 删除购物车
router.delete(
  '/',
  auth,
  validator({
    ids: 'array'
  }),
  remove
)

// 全选全不选
router.post('/selected', auth, selectAll)
router.post('/unselected', auth, unselectAll)

export default router
