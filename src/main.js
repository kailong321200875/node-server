// 导出默认的环境变量
const { APP_PORT } = require('./config/config.default')

const app = require('./app')

// 监听服务器端口初始化
app.listen(APP_PORT, () => {
  console.log(`listening on localhost:${APP_PORT}`)
})
