const Musics = require('../../crawler/database/Tables/Musics/Musics')
const { textSimilarity } = require('./SimilarityUtil1')
const { putSimilarMusicRLDB } = require('../../crawler/database/Tables/Relational_Tables/Musics_Similar/Musics_SimilarCattegory')
let musicPrincipal
let musicSecondary
let musicsNumber
let musicsComparison = []
let top10Similarity = []
let similarityScore

async function Principal(musicsArray) {
    /*Para as recomendações totais
    musicsNumber = await getMusicsNumber()
    for (let i = 0; i < musicsNumber; i++) {
        musicPrincipal = await Musics.findAll({ offset: i, limit: 1 })
        for (let o = i + 1; o < musicsNumber; o++) {
            musicSecondary = await Musics.findAll({ offset: i, limit: 1 })
            await cleanMusicsInformation(musicPrincipal[0], musicSecondary[0])
            await getSimilarityScore()
        }
        await putAllSimilarMusicDB(musicPrincipal[0].dataValues.music_mbid)
    }
    */
    for (let i = 0; i < musicsArray.length; i++) {
        musicPrincipal = musicsArray[i]
        for (let o = i + 1; o < musicsArray.length; o++) {
            musicSecondary = musicsArray[o]
            await getSimilarityScore(musicPrincipal, musicSecondary)
        }
        await putAllSimilarMusicDB(musicPrincipal.musicMbid)
    }
}

// async function cleanMusicsInformation(musicPrincipal, musicSecondary){
//     musicsComparison[0] = {
//         musicMbid: musicPrincipal.dataValues.music_mbid,
//         musicGenre: musicPrincipal.dataValues.genre
//     }
//     musicsComparison[1] = {
//         musicMbid: musicSecondary.dataValues.music_mbid,
//         musicGenre: musicSecondary.dataValues.genre
//     }
// }

async function getSimilarityScore(musicPrincipal, musicSecondary) {
    similarityScore = await textSimilarity(musicPrincipal, musicSecondary)
    if (similarityScore && similarityScore != NaN)
        await putTop10Similarity(musicSecondary.musicMbid, similarityScore)
}

async function putTop10Similarity(secondaryMusicMbid, similarityScore) {
    if (top10Similarity.length != 10) {
        top10Similarity.push({ secondaryMusicMbid, similarityScore })
    }
    else {
        for (let i = 0; i < top10Similarity.length; i++) {
            if (similarityScore > top10Similarity[i])
                top10Similarity[i] = similarityScore;
        }
    }
}

async function putAllSimilarMusicDB(principalMusicMbid) {
    for (let music of top10Similarity) {
        await putSimilarMusicRLDB(principalMusicMbid, music.secondaryMusicMbid, music.similarityScore)
        await putSimilarMusicRLDB(music.secondaryMusicMbid, principalMusicMbid, music.similarityScore)
    }
}
async function getMusicsNumber() {
    return await Musics.count()
}
module.exports = { Principal }
