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
let exist
async function getAllRecommendation(paramsPlaylistMusics) {
    allPlaylistMbidMusics = JSON.parse(paramsPlaylistMusics)
    allRecommendationMusics = []
    for (let i = 0; i < allPlaylistMbidMusics.length; i++) {
        allSimilarMusicsMbid = []
        await Musics_Similar.findAll({ where: { music_mbid: allPlaylistMbidMusics[i] }, order: [['similarityScore', 'DESC']] })
            .then(async musics => {
                for (let i = 0; i < musics.length; i++) {
                    if (!await ola(musics[i].dataValues.similarMusic_mbid)) {
                        allSimilarMusicsMbid.push({mbid:musics[i].dataValues.similarMusic_mbid, similarityScore: musics[i].dataValues.similarityScore})
                    }
                }

            })
    }
    await getTop10Musics(allSimilarMusicsMbid)
    await getAllMusics(allSimilarMusicsMbid)
    await prom
    return allRecommendationMusics
}

async function getAllMusics(allSimilarMusicsMbid) {
    prom = new Promise(async (resolve, reject) => {
        for (let i = 0; i < 10; i++) {
            musicInfo = await getAllMusicInformation(allSimilarMusicsMbid[i].mbid)
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
            if (i == allSimilarMusicsMbid.length - 1)
                resolve()
        }
    })
}

async function ola(param) {
    exist = false
    for (let i = 0; i < allRecommendationMusics.length; i++) {
        if (param == allSimilarMusicsMbid[i].similarMusicMbid)
            exist = true
    }
    return exist
}

async function getTop10Musics(allSimilarMusicsMbid){
    allSimilarMusicsMbid.sort((a,b) =>(a.similarityScore > b.similarityScore) ? 1 : ((b.similarityScore > a.similarityScore) ? -1 : 0))
}

async function Recommendation(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    paramsPlaylistMusics = req.params.playlistMusics
    res.json(await getAllRecommendation(paramsPlaylistMusics))
}

module.exports = { Recommendation }