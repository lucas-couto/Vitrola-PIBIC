const Sequelize = require('sequelize')
const connection = require('../../../database')


// Criar a tabela.
const Albums_Musics = connection.define('albums_musics', {
    albums_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    musics_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Albums_Musics