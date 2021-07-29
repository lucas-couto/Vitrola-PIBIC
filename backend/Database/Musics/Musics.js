const Sequelize = require('sequelize')
const connection = require('../database')


// Criar a tabela e/ou identifica a tabela.
const Musics = connection.define('musics', {
    music_mbid: {
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
    urlYoutube: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    releaseDate: {
        type: Sequelize.STRING,
        allowNull: true
    },
    directoryImage:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    genre:{
        type: Sequelize.TEXT('long'),
        allowNull: true
    }
})



module.exports = Musics