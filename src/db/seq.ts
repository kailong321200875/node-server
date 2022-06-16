import mongoose from 'mongoose'
import env from '@/config/config.default'

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = env

const DB_ADDRESS = `mongodb://${MYSQL_USER}:${MYSQL_PWD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}?authSource=admin`

mongoose.connect(DB_ADDRESS, (err) => {
  if (err) {
    console.log('数据库连接失败', err)
  } else {
    console.log('数据库连接成功')
  }
})

export default mongoose
