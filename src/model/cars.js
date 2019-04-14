const Sequelize = require('sequelize')

const Cars = mysql_connection.define('cars',
  {
    id:{
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey:true,
      field: 'id'
    },
    userId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    name:{
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'name'
    }
  },
  {
    tableName:'cars',
    timestamps: false,
    paranoid: false,
    freezeTableName: true
  }
)

module.exports = Cars