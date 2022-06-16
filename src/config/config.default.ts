// 导入环境变量插件
import Dotenv from 'dotenv'

Dotenv.config()

// 导出环境变量
export default process.env as unknown as IConfigDefault
