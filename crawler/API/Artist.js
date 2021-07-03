// Importando bibliotecas.
const axios = require('axios')
// Importando as funções de outros arquivos.
const { createNewMbid } = require('./adjusts/newMbid')
const downloadImage = require('./adjusts/downloadImage');

// Declarando variaveis.
let correctTopArtists
let artistName
let artistMbid
let artistUrl
let artistImageUrl
let artistBiography
let encodedArtistName
let error = false
async function startCrawler(country) {
    /*
    Essa função pega um pais.
    E em cada pais a URL retorna os artistas mais populares deste pais.
    Informacoes adquiridas: Um array de objetos, sendo cada objeto um artista popular de um determinado pais.
    */
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&limit=1000&api_key=d3fa18ca96490032eea33ffb8bf42b6f&format=json`)
        .then(async res => {
            if (res.data.error)
                console.log(res.data)
            error = false
            correctTopArtists = res.data.topartists ? res.data.topartists.artist : null
        })
        .catch(async e => {
            console.log(`Erro (Start): ${e}`)
            if(e.errno == -4039){
                error = true
                await startCrawler(country)
            }
        })
    if (!error)
        if (correctTopArtists && correctTopArtists.length !== 0)
            await allArtists(correctTopArtists)
}

async function allArtists(correctTopArtists) {
    for (let artist of correctTopArtists) {
        encodedArtistName = encodeURI(artist.name)
        artistName = artist.name
        artistUrl = artist.url || null
        await getArtistInfo(artistMbid, artistName, artistUrl)
    }
}
async function getArtistInfo(artistMbid, artistName, artistUrl) {
    /*
    Essa funcao consome outra URL: artist.getinfo.
    Essa URL retorna mais informacoes sobre um determinado artista.
    Informacao adquirida: Biografia do artista.
    */
   console.log(artistMbid)
   console.log(artistName)
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodedArtistName}&api_key=d3fa18ca96490032eea33ffb8bf42b6f&format=json`)
        .then(async res => {
            if (res.data.error)
                console.log(res.data)
            error = false
            artistMbid = res.data.artist.mbid
            artistBiography = res.data.artist.bio ? res.data.artist.bio.summary : null
        })
        .catch(async e => {
            console.log(`Erro (getArtistInfo): ${e}`)
            if(e.errno == -4039){
                error = true
                await getArtistInfo(artistMbid, artistName, artistUrl)
            }
        })
    if (!error)
        await searchArtistImage(artistMbid, artistName, artistBiography, artistUrl)
}

async function searchArtistImage(artistMbid, artistName, artistBiography, artistUrl) {
    /*
    Essa função consome a API do Deezer.
    Como a API do Last Fm nao retorna imagens corretas, utilizamos outra API para achar imagens.
    Informacao adquirida: URL da imagem do artista.
    Depois de todo esse processo, são chamadas outras funções para dar continuidade ao encadeamento.
    */
    await axios.get(`https://api.deezer.com/search/artist?q=${encodedArtistName}`)
        .then(res => {
            artistImageUrl = res.data.data[0] ? res.data.data[0].picture_medium : null
        })
        .catch(e => {
            console.log(`Erro (searchArtistImage): ${e}`)
        })
    if (artistMbid)
        await downloadImage.downloadImageArtists(artistMbid, artistName, artistBiography, artistUrl, artistImageUrl, null, false)
    else {
        artistMbid = createNewMbid()
        await downloadImage.downloadImageArtists(artistMbid, artistName, artistBiography, artistUrl, artistImageUrl, null, true)
    }
}

module.exports.startCrawler = startCrawler