const Musics = require('../../database/Tables/Musics/Musics')
const { textSimilarity } = require('./SimilarityUtil1')
const { putSimilarMusicRLDB } = require('../../database/Tables/Relational_Tables/Musics_Similar/Musics_SimilarCattegory')
let musicsOne = []
let musicMbid
let musicGenre
let top10Similarity = []
let similarityScore

async function Principal() {
    await Musics.findAll()
        .then(musics => {
            musics.forEach(music => {
                musicMbid = music.dataValues.music_mbid
                musicGenre = music.dataValues.genre
                musicsOne.push({ musicMbid, musicGenre })
            });
        })
    await getSimilarityScore()
}

async function getSimilarityScore() {
    for (let i = 0; i < musicsOne.length; i++) {
        top10Similarity.length = 0
        for (let o = 0; o < musicsOne.length; o++) {
            if (i != o)
                similarityScore = await textSimilarity(musicsOne[i], musicsOne[o])
            if (similarityScore && similarityScore != NaN)
                await putTop10Similarity(musicsOne[o].musicMbid, similarityScore)
        }
        await putAllSimilarMusicDB(musicsOne[i].musicMbid)
    }
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
    }
}

module.exports = { Principal }