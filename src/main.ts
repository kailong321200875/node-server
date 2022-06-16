// 导出默认的环境变量
import env from './config/config.default'
import app from './app'

const { APP_PORT } = env

// 监听服务器端口初始化
app.listen(APP_PORT, () => {
  console.log(`listening on localhost:${APP_PORT}`)
})
