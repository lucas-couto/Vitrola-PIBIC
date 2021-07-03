const Sequelize = require('sequelize')
const {DB} = require('../.env')
// Informações para a conexão com o banco de dados.
// DB.dbname é o nome do seu Schema.
// DB.username é o seu usuario da sua conexão MySQL.
// DB.password é a senha da sua conexão MySQL.
const connection = new Sequelize(DB.dbname, DB.username, DB.password, DB.options)

module.exports = connection