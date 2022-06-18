import { Context } from 'koa'

const handler = (res: any, ctx: Context) => {
  if (res.error) {
    ctx.status = 500
  } else {
    ctx.status = 200
  }
  ctx.body = res
}

export default handler
