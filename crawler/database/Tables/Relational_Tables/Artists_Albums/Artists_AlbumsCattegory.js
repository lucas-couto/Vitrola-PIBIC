const Artists_Albums = require('./Artists_Albums')

let data
let hours
let minutes
// Colocar as informações no banco de dados.
async function putAlbumRLDB(artistMbid, albumMbid) {
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    await Artists_Albums.findOne({ where: { artist_mbid: artistMbid, albums_mbid: albumMbid } })
        .then(async artists_albums => {
            if (artists_albums)
                console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Album RLDB ja cadastrado!`)
            else{
                await Artists_Albums.create({
                    artist_mbid: artistMbid,
                    albums_mbid: albumMbid
                }).then(() => {
                    console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Album RLDB cadastrado com sucesso!`)
                }).catch(e => {
                    console.log(`Erro(putAlbumRLDB) ${e}`)
                })
            }
        })
}

module.exports = { putAlbumRLDB }