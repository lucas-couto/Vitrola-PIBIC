const Musics = require('./Musics')
const withoutMbid = require('../withoutMbid/withoutMbid')
const { putWithoutMbidDB } = require('../withoutMbid/withoutMbidCattegory')
const { putMusicRLDB } = require('../Relational_Tables/Albums_Musics/Albums_MusicsCattegory')

let newMusicMbid
let hours
let minutes
// Colocar as informações no banco de dados.
async function putMusicsDB(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageDirectory, musicGenre, artistName, albumMbid, withoutMbidParam) {
    newMusicMbid = null
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    if (withoutMbidParam) {
        await withoutMbid.findOne({ where: { name: musicName, artistName: artistName, type: 'music' } })
            .then(async music => {
                if (music) {
                    console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Musica sem Mbid já cadastrado!`)
                    newMusicMbid = music.newMbid
                } else {
                    await Musics.create({
                        music_mbid: musicMbid,
                        name: musicName,
                        biography: musicBiography,
                        urlYoutube: musicYoutubeUrl,
                        releaseDate: musicReleaseDate,
                        directoryImage: musicImageDirectory,
                        genre: musicGenre
                    }).then(() => {
                        console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Musica sem Mbid cadastrada com sucesso!`)
                    }).catch(e => {
                        console.log(e)
                    })
                    await putWithoutMbidDB(musicMbid, musicName, artistName, 'music')
                }
            })
            .catch(e => {
                console.log(e)
            })
    } else {
        await Musics.findOne({ where: { music_mbid: musicMbid } })
            .then(async music => {
                if (music) {
                    console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Musica ja cadastrada!`)
                } else {
                    await Musics.create({
                        music_mbid: musicMbid,
                        name: musicName,
                        biography: musicBiography,
                        urlYoutube: musicYoutubeUrl,
                        releaseDate: musicReleaseDate,
                        directoryImage: musicImageDirectory,
                        genre: musicGenre
                    }).then(() => {
                        console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Musica cadastrada com sucesso!`)
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
            .catch(e => {
                console.log(`Erro(putMusicsDB): ${e}`)
            })
    }
    await putMusicRLDB(albumMbid, newMusicMbid || musicMbid)
}
module.exports = { putMusicsDB }