import { Context } from 'koa'

export const handler = (res: any, ctx: Context) => {
  ctx.body = res
}
