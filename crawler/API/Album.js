// Importando bibliotecas.
const axios = require('axios')

// Importando as funções de outros arquivos.
const { ifAlbumExist } = require('./adjusts/ifAlbumExist')
const { createNewMbid } = require('./adjusts/newMbid')
const { APIkey } = require('../.env')
// Declarando variaveis.
let correctAlbums
let albumTracks
let albumName
let albumMbid
let albumUrl
let albumImageUrl
let encodedArtistName
let encodedAlbumName
let error = false

async function getTopAlbums(artistMbid, artistName) {
    /*
    Essa funcao consome a URL: artist.gettopalbums.
    Tem o objetivo de achar os melhores albuns de um determinado artista.
    A informacao adquirida e: Um array de objetos com os albuns populares de um artista.
    */
    encodedArtistName = encodeURI(artistName)
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodedArtistName}&api_key=${APIkey}&format=json`)
        .then(res => {
            if (res.data.error)
                console.log(res.data)
            error = false
            correctAlbums = res.data.topalbums ? res.data.topalbums.album : null
        })
        .catch(async e => {
            console.log(`Erro (getTopAlbums): ${e}`)
            if (e.errno == -4039) {
                error = true
                await getTopAlbums(artistMbid, artistName)
            }
        })
    if (!error)
        if (correctAlbums && correctAlbums.length !== 0)
            await allAlbums(artistMbid, artistName, correctAlbums, encodedArtistName)
}

async function allAlbums(artistMbid, artistName, correctAlbums, encodedArtistName) {
    for (let album of correctAlbums) {
        albumName = album.name
        await albumGetInfo(albumName, artistMbid, artistName, encodedArtistName, encodedAlbumName)
    }
}
/*
Essa funcao consome a URL: album.getinfo.
Tem o objetivo de adquirir mais informacoes sobre um determinado album.
Informacoes adquiridas: Mbid, URL, imagem e biografia do album.
*/
async function albumGetInfo(albumName, artistMbid, artistName, encodedArtistName, encodedAlbumName) {
    encodedAlbumName = encodeURI(albumName)
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${APIkey}&artist=${encodedArtistName}&album=${encodedAlbumName}&format=json`)
        .then(res => {
            if (res.data.error)
                console.log(res.data)

            albumMbid = res.data.album.mbid
            albumUrl = res.data.album.url || null
            albumBiography = res.data.album.wiki ? res.data.album.wiki.summary : null
            albumImageUrl = res.data.album.image ? res.data.album.image[2]["#text"] : null
            albumTracks = res.data.album.tracks ? res.data.album.tracks.track : null
            error = false
        })
        .catch(async e => {
            console.log(`Erro (albumGetInfo) ${e}`)
            if (e.errno == -4039) {
                error = true
                await albumGetInfo(albumName, artistMbid, artistName, encodedArtistName, encodedAlbumName)
            }
        })
    if (!error) {
        if (albumTracks && albumTracks.length != 0) {
            if (albumMbid) {
                await ifAlbumExist(albumMbid, albumName, albumBiography, albumUrl, albumImageUrl, artistMbid, artistName, encodedArtistName, encodedAlbumName, albumTracks, false)

            } else {
                albumMbid = createNewMbid()
                await ifAlbumExist(albumMbid, albumName, albumBiography, albumUrl, albumImageUrl, artistMbid, artistName, encodedArtistName, encodedAlbumName, albumTracks, true)
            }
        }
    }
}
module.exports.getTopAlbums = getTopAlbums