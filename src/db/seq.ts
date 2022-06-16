import { Sequelize } from 'sequelize'
import env from '../config/config.default'

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = env

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql'
})

seq
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch((err) => {
    console.log('数据库连接失败', err)
  })

export default seq
