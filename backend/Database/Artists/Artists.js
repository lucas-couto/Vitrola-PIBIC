const Sequelize = require('sequelize')
const connection = require('../database')

// Criar a tabela.
const Artists = connection.define('artists', {
    artist_mbid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    biography: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    directoryImage:{
        type: Sequelize.TEXT,
        allowNull: true
    }
})


module.exports = Artists