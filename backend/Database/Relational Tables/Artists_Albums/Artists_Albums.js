const Sequelize = require('sequelize')
const connection = require('../../database')


// Criar a tabela.
const Artists_Albums = connection.define('artists_albums', {
    artist_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    albums_mbid: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Artists_Albums