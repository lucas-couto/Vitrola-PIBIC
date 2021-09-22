const { getAllMusicInformation } = require('./Music')
const Musics_Similar = require('../../Database/Relational Tables/Musics_Similar/Musics_Similar')
let allRecommendationMusics = []
let allSimilarMusicsMbid = []
let allPlaylistMbidMusics
let musicInfo
let musicMbid
let musicName
let musicYoutubeUrl
let musicDirectoryImage
let musicAlbumName
let musicAlbumMbid
let musicArtistName
let musicArtistMbid
let prom
let musics
/*
Essa API é responsavel por retornar as recomendacoes da playlist do usuario.
Para chamar essa API precisamos dos Mbids das musicas que estao na playlist.
Ela retorna sempre 10 recomendacoes, ranqueando-as de acordo com a pontuacao de similaridade.
*/
async function getAllRecommendation(paramsPlaylistMusics) {
    allPlaylistMbidMusics = JSON.parse(paramsPlaylistMusics)
    allRecommendationMusics.length = 0
    for (let i = 0; i < allPlaylistMbidMusics.length; i++) {
        allSimilarMusicsMbid.length = 0
        musics = await Musics_Similar.findAll({ where: { music_mbid: allPlaylistMbidMusics[i] }, order: [['similarityScore', 'ASC']], limit: 10 })
        for (let i = 0; i < musics.length; i++) {
            if (!await discardExistingPlaylistMusics(musics[i].dataValues.similarMusic_mbid, allPlaylistMbidMusics)) {
                allSimilarMusicsMbid.push({ mbid: musics[i].dataValues.similarMusic_mbid, similarityScore: musics[i].dataValues.similarityScore })
            }
        }
    }
    await orderRecommendationMusics(allSimilarMusicsMbid)
    await getTop10Musics(allSimilarMusicsMbid)
    return allRecommendationMusics.length == 0 ? null : allRecommendationMusics
}

async function getTop10Musics(allSimilarMusicsMbid) {
    let arrayLength = allSimilarMusicsMbid.length
    arrayLength > 10 ? arrayLength = 10 : arrayLength = arrayLength
    for (let i = 0; i < arrayLength; i++) {
        console.log(allSimilarMusicsMbid[i].mbid)
        musicInfo = await getAllMusicInformation(allSimilarMusicsMbid[i].mbid).catch(e => { console.log(e) })
        musicMbid = musicInfo.music.musicMbid
        musicName = musicInfo.music.musicName
        musicYoutubeUrl = musicInfo.music.musicYoutubeUrl
        musicDirectoryImage = musicInfo.music.musicImage
        musicAlbumName = musicInfo.album.albumName
        musicAlbumMbid = musicInfo.album.albumMbid
        musicArtistName = musicInfo.artist.artistName
        musicArtistMbid = musicInfo.artist.artistMbid
        allRecommendationMusics.push({
            musicMbid,
            musicName, musicYoutubeUrl,
            musicDirectoryImage, musicAlbumName,
            musicAlbumMbid, musicArtistName,
            musicArtistMbid
        })
    }
}

async function discardExistingPlaylistMusics(similarMusicMbid, allPlaylistMbidMusics) {
    for (let i = 0; i <= allPlaylistMbidMusics.length; i++) {
        if (i < allSimilarMusicsMbid.length) {
            if (similarMusicMbid == allPlaylistMbidMusics[i] || similarMusicMbid == allSimilarMusicsMbid[i].mbid)
                return true
        } else {
            if (similarMusicMbid == allPlaylistMbidMusics[i])
                return true
        }
    }
    return false
}

async function orderRecommendationMusics(allSimilarMusicsMbid) {
    allSimilarMusicsMbid.sort((a, b) => (a.similarityScore > b.similarityScore) ? 1 : ((b.similarityScore > a.similarityScore) ? -1 : 0))
}

async function Recommendation(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    paramsPlaylistMusics = req.params.playlistMusics
    res.json(await getAllRecommendation(paramsPlaylistMusics))
}


module.exports = { Recommendation }
