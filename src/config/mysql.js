const Sequelize = require('sequelize')

const database = 'vinicius'
const hostname = 'localhost'
const username = 'vinicius'
const password = 'root'

const connection = new Sequelize(database, username, password, {
  host: hostname,
  dialect: 'mysql',
  port: 3306,
  pool:{
    max:5,
    min:0
  },
  logging: true,
})

const connect = async () => {
  return new Promise(async (resolve, reject) => {

    await connection
      .authenticate()
      .then(() => {
        return resolve(connection)
      })
      .catch(err => {
        console.error(err)
        reject(null)
      })
  })
}

module.exports = connect

