const Sequelize = require('sequelize')
const connection = require('../../database')

// Criar a tabela e/ou identifica a tabela.
const Artists_Similar = connection.define('artists_similar', {
    artist_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    similarArtist_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Artists_Similar