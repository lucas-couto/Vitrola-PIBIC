const Albums_Musics = require('./Albums_Musics')
let data
let hours
let minutes
// Colocar as informações no banco de dados.
async function putMusicRLDB(albumMbid, musicMbid) {
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    await Albums_Musics.findOne({ where: { albums_mbid: albumMbid, musics_mbid: musicMbid } })
        .then(async albums_musics => {
            if(albums_musics)
                console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Musica RLDB ja cadastrada!`)
            else{
                await Albums_Musics.create({
                    albums_mbid: albumMbid,
                    musics_mbid: musicMbid
                }).then(() => {
                    console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Musica RLDB cadastrada com sucesso!`)
                }).catch(e => {
                    console.log(`Erro (putMusicRLDB): ${e}`)
                    console.log(albumMbid)
                    console.log(musicMbid)
                })
            }
        })
}

module.exports = { putMusicRLDB }