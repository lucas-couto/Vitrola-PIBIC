const Artists_Similar = require('./Artists_Similar')

let data
let hours
let minutes
let existArtists_Albums
// Colocar as informações no banco de dados.
async function putSimilarRLDB(artistMbid, similarArtistMbid) {
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    existArtists_Albums = await Artists_Similar.findOne({ where: { artist_mbid: artistMbid, similarArtist_mbid: similarArtistMbid } })
    if (existArtists_Albums)
        console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Similar RLDB ja cadastrado!`)
    else{
        await Artists_Similar.create({
            artist_mbid: artistMbid,
            similarArtist_mbid: similarArtistMbid
        }).then(() => {
            console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Similar RLDB cadastrado com sucesso!`)
        }).catch(e => {
            console.log(`Erro(putSimilarRLDb) ${e}`)
        })
    }
}

module.exports = { putSimilarRLDB }