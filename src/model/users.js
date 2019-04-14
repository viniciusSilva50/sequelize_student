const Sequelize = require('sequelize')

const Users = mysql_connection.define('users',
  {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey:true,
      field: 'id'
    },
    name:{
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'name'
    }
  },
  {
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  }
)

module.exports = Users