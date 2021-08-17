const Sequelize = require('sequelize')
const connection = require('../../database')

// Criar a tabela.
// Essa tabela serve para identificar os itens que nao tem mbid.
const withoutMbid = connection.define('withoutMbid', {
    newMbid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artistName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = withoutMbid 
