const connection = require('./database')

const Albums = require('./Tables/Albums/Albums')
const Musics = require('./Tables//Musics/Musics')
const Artists = require('./Tables/Artists/Artists')
const withoutMbid = require('./Tables/withoutMbid/withoutMbid')

const Artists_Similar = require('./Tables/Relational_Tables/Artists_Similar/Artists_Similar')
const Artists_Albums = require('./Tables/Relational_Tables/Artists_Albums/Artists_Albums')
const Albums_Musics = require('./Tables/Relational_Tables/Albums_Musics/Albums_Musics')
const Musics_Similar = require('./Tables/Relational_Tables/Musics_Similar/Musics_Similar')


// Relacionamento entre as tabelas!
Artists_Similar.belongsTo(Artists, {foreignKey: 'artist_mbid'}) 
Artists_Similar.belongsTo(Artists, {foreignKey: 'similarArtist_mbid', as:'similarArtist'}) 
Artists_Albums.belongsTo(Artists, {foreignKey: 'artist_mbid'})
Artists_Albums.belongsTo(Albums, {foreignKey: 'albums_mbid'})
Albums_Musics.belongsTo(Albums, {foreignKey: 'albums_mbid'})
Albums_Musics.belongsTo(Musics, {foreignKey: 'musics_mbid'})
Musics_Similar.belongsTo(Musics, {foreignKey: 'music_mbid'}) 
Musics_Similar.belongsTo(Musics, {foreignKey: 'similarMusic_mbid', as:'similarMusic'})


//Metodo para gerar as tabelas de relação
module.exports = connection.sync()


