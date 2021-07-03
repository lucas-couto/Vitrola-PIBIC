const Sequelize = require('sequelize')
const {DB} = require('../.env')

const connection = new Sequelize(DB.dbname, DB.username, DB.password, DB.options)

module.exports = connection
