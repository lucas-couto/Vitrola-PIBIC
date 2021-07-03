const Musics_Similar = require('./Musics_Similar')

let data
let hours
let minutes
// Colocar as informações no banco de dados.
async function putSimilarMusicRLDB(principalMusicMbid, secondaryMusicMbid, similarityScore) {
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    await Musics_Similar.findOne({ where: { music_mbid: principalMusicMbid, similarMusic_mbid: secondaryMusicMbid } })
        .then(async musics_similar => {
            if (musics_similar)
                console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Musica Similar RLDB ja cadastrado!`)
            else{
                await Musics_Similar.create({
                    music_mbid: principalMusicMbid,
                    similarMusic_mbid: secondaryMusicMbid,
                    similarityScore: similarityScore
                }).then(() => {
                    console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Musica Similar cadastrado com sucesso!`)
                }).catch(e => {
                    console.log(`Erro(putSimilarMusicRLDB) ${e}`)
                })
            }
        })
}

module.exports = { putSimilarMusicRLDB }