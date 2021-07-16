const Musics = require('./Musics')
const withoutMbid = require('../withoutMbid/withoutMbid')
const { putWithoutMbidDB } = require('../withoutMbid/withoutMbidCattegory')
const { putMusicRLDB } = require('../Relational_Tables/Albums_Musics/Albums_MusicsCattegory')
const Recommendations = require('../../../../recommendations/Recommendations')

let newMusicMbid
let existMusic
let hours
let minutes
let counter = 0
let musicsArray = []
// Colocar as informações no banco de dados.
async function putMusicsDB(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageDirectory, musicGenre, artistName, albumMbid, withoutMbidParam) {
    newMusicMbid = null
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    if (withoutMbidParam) {
        newMusicMbid = await putMusicWithoutMbidDB(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageDirectory, musicGenre, artistName)
    } else {
        await putMusicWithMbid(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageDirectory, musicGenre)
    }
    await putMusicRLDB(albumMbid, newMusicMbid || musicMbid)
}

async function get250music(musicMbid, musicGenre) {
    counter++
    musicsArray.push({ musicMbid: musicMbid, musicGenre: musicGenre })
    if (counter == 500) {
        await Recommendations.startRecommendations(musicsArray)
        musicsArray.length = 0
        counter = 0
    }
}

async function putMusicWithoutMbidDB(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageDirectory, musicGenre, artistName) {
    existMusic = await withoutMbid.findOne({ where: { name: musicName, artistName: artistName, type: 'music' } })
    if (existMusic) {
        console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Musica sem Mbid já cadastrado!`)
        return existMusic.dataValues.newMbid
    } else {
        await Musics.create({
            music_mbid: musicMbid,
            name: musicName,
            biography: musicBiography,
            urlYoutube: musicYoutubeUrl,
            releaseDate: musicReleaseDate,
            directoryImage: musicImageDirectory,
            genre: musicGenre
        }).then(async () => {
            console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Musica sem Mbid cadastrada com sucesso!`)
            await get250music(musicMbid, musicGenre)
        }).catch(e => {
            console.log(e)
        })
        await putWithoutMbidDB(musicMbid, musicName, artistName, 'music')
        return null
    }
}
async function putMusicWithMbid(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageDirectory, musicGenre) {
    existMusic = await Musics.findOne({ where: { music_mbid: musicMbid } })
    if (existMusic)
        console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Musica ja cadastrada!`)
    else {
        await Musics.create({
            music_mbid: musicMbid,
            name: musicName,
            biography: musicBiography,
            urlYoutube: musicYoutubeUrl,
            releaseDate: musicReleaseDate,
            directoryImage: musicImageDirectory,
            genre: musicGenre
        }).then(async () => {
            console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Musica cadastrada com sucesso!`)
            await get250music(musicMbid, musicGenre)
        }).catch(e => {
            console.log(e)
        })
    }
}

module.exports = { putMusicsDB }