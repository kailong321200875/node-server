// 导出默认的环境变量
import env from './config'
import app from './app'
import '@/db/seq'

const { APP_PORT } = env

// 监听服务器端口初始化
app.listen(APP_PORT, () => {
  console.log(`\n    listening on localhost:${APP_PORT} \n`)
})
