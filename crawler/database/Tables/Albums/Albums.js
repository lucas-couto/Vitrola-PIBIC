const Sequelize = require('sequelize') 
const connection = require('../../database')

// Criar a tabela.

const Albums = connection.define('albums', {
    album_mbid: {
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
        allowNull: true
    },
    url: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    releaseDate : {
        type: Sequelize.TEXT,
        allowNull: true
    },
    directoryImage:{
        type: Sequelize.TEXT,
        allowNull: true
    }
})


module.exports = Albums