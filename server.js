const Q = require('q')

global.mysql_connection = null

const mysqlConnection = require('./src/config/mysql')
let usersModel = null
let carsModel = null

const createRelations = () => {
  usersModel.hasMany(carsModel, {foreignKey: 'user_id', sourceKey: 'id', constraints: true})
  carsModel.belongsTo(usersModel, {foreignKey: 'user_id', targetKey: 'id', constraints: true})

}

const init = async () => {


  Q.fcall(async () => {
      let connection = await mysqlConnection()
      if(connection === null){
        throw 'Erro on try to connect to database'
      }

      global.mysql_connection = connection
      return true
    })
    .then((data) => {
      usersModel = require('./src/model/users')
      carsModel = require('./src/model/cars')

      return data
    })
    .then(async (data) => {
      createRelations()
      return data
    })
    .then(async (data) => {

      let carsWithUser = await carsModel
        .findAll({
          attributes: [
            'name'
          ],
          include: [
            {
              model: usersModel
            }
          ],
          where:{
            userId: 1
          }
        })
        .catch(err => {
          console.error(err)
          return []
        })

      let usersWithCars = await usersModel
        .findAll({
          attributes: [
            'name'
          ],
          include: [
            {
              model: carsModel
            }
          ],
          where: {
            id: 1
          }
        })
        .catch( err => {
          console.error(err)
          return []
        })

      console.log('Fim')

      return data
    })
    .catch(error => {
      console.error(error)
    })

}

init()