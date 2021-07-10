// Importando bibliotecas.
const axios = require('axios')

// Importando as funções de outros arquivos.
const { createNewMbid } = require('./adjusts/newMbid')
const downloadImage = require('./adjusts/downloadImage')

// Declarando variaveis.
let correctSimilarArtists
let similarArtistName
let similarArtistMbid
let similarArtistUrl
let similarArtistBiography
let similarArtistUrlImage
let encodedArtistName
let encodedSimilarName
let error = false
/*
Essa função consome a URL: artist.getsimilar.
Tem o objetivo de adquirir todos os similares de um determinado artista.
Informacoes adquiridas: Nome, mbid e URL do artista similar.
*/
async function getSimilar(artistMbid, artistName) {
    encodedArtistName = encodeURI(artistName)
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodedArtistName}&limit=50&api_key=d3fa18ca96490032eea33ffb8bf42b6f&autocorrect=1&format=json`)
        .then(res => {
            if (res.data.error)
                console.log(res.data)
            correctSimilarArtists = res.data.similarartists ? res.data.similarartists.artist : null
            error = false
        })
        .catch(async e => {
            console.log(`Erro (getSimilar): ${e}`)
            if(e.errno == -4039){
                error = true
                await getSimilar(artistMbid, artistName)
            }
        })
    if (!error)
        if (correctSimilarArtists && correctSimilarArtists.length !== 0)
            await allSimilarArtist(artistMbid, correctSimilarArtists)
}
async function allSimilarArtist(artistMbid, correctSimilarArtists) {
    for (let similarArtist of correctSimilarArtists) {
        similarArtistName = similarArtist.name
        similarArtistUrl = similarArtist.url || null
        await getSimilarInfo(similarArtistName, similarArtistUrl, artistMbid)
    }
}
/*
Essa função consome a URL: artist.getinfo.
Tem o objetivo de adquirir mais informacoes sobre o artista similar.
Informacao adquirida: Biografia do artista similar.
*/
async function getSimilarInfo(similarArtistName, similarArtistUrl, artistMbid) {
    encodedSimilarName = encodeURI(similarArtistName)
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodedSimilarName}&api_key=d3fa18ca96490032eea33ffb8bf42b6f&autocorrect=1&format=json`)
        .then(res => {
            if (res.data.error)
                console.log(res.data)
            similarArtistMbid = res.data.artist.mbid
            similarArtistBiography = res.data.artist.bio ? res.data.artist.bio.summary : null
            error = false
        })
        .catch(async e => {
            console.log(`Erro (getSimilarInfo): ${e}`)
            if(e.errno == -4039){
                error = true
                await getSimilarInfo(similarArtistName, similarArtistUrl, artistMbid)
            }
        })
    if (!error)
        await searchSimilarArtistImage(similarArtistMbid, similarArtistName, similarArtistBiography, similarArtistUrl, artistMbid)
}

/*
Essa função consome a API do Deezer.
Como a API do Last Fm nao retorna imagens corretas, utilizamos outra API para achar imagens.
Informacao adquirida: URL da imagem do artista similar.
Depois de todo esse processo, são chamadas outras funções para dar continuidade ao encadeamento.
*/
async function searchSimilarArtistImage(similarArtistMbid, similarArtistName, similarArtistBiography, similarArtistUrl, artistMbid) {
    await axios.get(`https://api.deezer.com/search/artist?q=${encodedSimilarName}`)
        .then(res => {
            similarArtistUrlImage = res.data.data[0].picture_medium
        })
        .catch(e => {
            console.log(`Erro (searchSimilarArtistImage): ${e}`)
        })
    if (similarArtistMbid)
        await downloadImage.downloadImageArtists(similarArtistMbid, similarArtistName, similarArtistBiography, similarArtistUrl, similarArtistUrlImage, artistMbid, false)
    else {
        similarArtistMbid = createNewMbid()
        await downloadImage.downloadImageArtists(similarArtistMbid, similarArtistName, similarArtistBiography, similarArtistUrl, similarArtistUrlImage, artistMbid, true)
    }
}


module.exports.getSimilar = getSimilar