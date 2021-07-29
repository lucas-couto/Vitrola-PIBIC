const Artists_Albums = require('./Artists_Albums')

let data
let hours
let minutes
let existArtists_Albums
// Colocar as informações na tabela relacional.
async function putAlbumRLDB(artistMbid, albumMbid) {
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    existArtists_Albums = await Artists_Albums.findOne({ where: { artist_mbid: artistMbid, albums_mbid: albumMbid } })
    if (existArtists_Albums)
        console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Album RLDB ja cadastrado!`)
    else {
        await Artists_Albums.create({
            artist_mbid: artistMbid,
            albums_mbid: albumMbid
        }).then(() => {
            console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Album RLDB cadastrado com sucesso!`)
        }).catch(e => {
            console.log(`Erro(putAlbumRLDB) ${e}`)
        })
    }
}

module.exports = { putAlbumRLDB }