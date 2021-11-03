const Musics = require('../../crawler/database/Tables/Musics/Musics')
const { textSimilarity } = require('./SimilarityUtil1')
const { putSimilarMusicRLDB } = require('../../crawler/database/Tables/Relational_Tables/Musics_Similar/Musics_SimilarCattegory')
const Musics_Similar = require('../../crawler/database/Tables/Relational_Tables/Musics_Similar/Musics_Similar')
let musicPrincipal
let musicSecondary
let musicsNumber
let musicsComparison = []
let top10Similarity = []
let similarityScore
/*
    Essa funcao e responsavel por um array de musicas e aplicar a comparacao.
*/
async function Principal() {
    musicsNumber = await getMusicsNumber()
    for (let i = 0; i < musicsNumber; i++) {
        musicPrincipal = await Musics.findAll({ offset: i, limit: 1 })
        for (let o = i + 1; o < musicsNumber; o++) {
            musicSecondary = await Musics.findAll({ offset: o, limit: 1 })
            await cleanMusicsInformation(musicPrincipal[0], musicSecondary[0])
            await getSimilarityScore(musicsComparison[0], musicsComparison[1])
        }
        await putAllSimilarMusicDB(musicPrincipal[0].dataValues.music_mbid)
    }
}

async function cleanMusicsInformation(musicPrincipal, musicSecondary){
    musicsComparison[0] = {
        musicMbid: musicPrincipal.dataValues.music_mbid,
        musicGenre: musicPrincipal.dataValues.genre
    }
    musicsComparison[1] = {
        musicMbid: musicSecondary.dataValues.music_mbid,
        musicGenre: musicSecondary.dataValues.genre
    }
}

// Onde vai ser gerado a similaridade entre duas musicas
async function getSimilarityScore(musicPrincipal, musicSecondary) {
    similarityScore = await textSimilarity(musicPrincipal, musicSecondary)
    if (similarityScore && similarityScore != NaN)
        await putTop10Similarity(musicSecondary.musicMbid, similarityScore)
}

// Funcao responsavel por destacar as 10 musicas mais similares de uma musica principal.
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
// Colocar todas as musicas similares no banco de dados.
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
