const Sequelize = require('sequelize')
const connection = require('../../../database')

// Criar a tabela.
const Musics_Similar = connection.define('musics_similar', {
    music_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    similarMusic_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    similarityScore: {
        type: Sequelize.REAL,
        allowNull: false
    }
})


module.exports = Musics_Similar