const Artists_Similar = require('./Artists_Similar')

let data
let hours
let minutes
// Colocar as informações no banco de dados.
async function putSimilarRLDB(artistMbid, similarArtistMbid) {
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    await Artists_Similar.findOne({ where: { artist_mbid: artistMbid, similarArtist_mbid: similarArtistMbid } })
        .then(async artists_similar => {
            if (artists_similar)
                console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Similar RLDB ja cadastrado!`)
            else {
                // Cadastra o artista principal com o seu similar.
                await Artists_Similar.create({
                    artist_mbid: artistMbid,
                    similarArtist_mbid: similarArtistMbid
                }).then(() => {
                    console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Similar RLDB cadastrado com sucesso!`)
                }).catch(e => {
                    console.log(`Erro(putSimilarRLDb) ${e}`)
                })
                // Cadastra o artista similar com o artista principal.
                await Artists_Similar.create({
                    artist_mbid: similarArtistMbid,
                    similarArtist_mbid: artistMbid
                }).then(() => {
                    console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Similar RLDB cadastrado com sucesso!`)
                }).catch(e => {
                    console.log(`Erro(putSimilarRLDb) ${e}`)
                })
            }
        })
}

module.exports = { putSimilarRLDB }