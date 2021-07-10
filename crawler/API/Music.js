// Importando bibliotecas.
const axios = require('axios')

// Importando as funções de outros arquivos.
const { getUrlYoutube } = require('./adjusts/urlYoutube')
const { createNewMbid } = require('./adjusts/newMbid')

// Declarando variaveis.
let musicName
let musicUrl
let musicMbid
let musicBiography
let musicTag
let musicGenres = []
let encodedArtistName
let encodedAlbumName
let encodedMusicName
let albumTracks
let error
async function getTopTracks(albumMbid, albumName, artistName) {
    /*
    Essa funcao utiliza a URL: album.getinfo.
    Tem o objetivo de adquirir todas as musicas de um determinado album.
    Informacoes adquiridas: Um array de objetos com varias musicas.
    */
    encodedArtistName = encodeURI(artistName)
    encodedAlbumName = encodeURI(albumName)
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=d3fa18ca96490032eea33ffb8bf42b6f&artist=${encodedArtistName}&album=${encodedAlbumName}&autocorrect=1&format=json`)
        .then(res => {
            if (res.data.error)
                console.log(res.data)
            error = false
            albumTracks = res.data.album.tracks ? res.data.album.tracks.track : null
        })
        .catch(async e => {
            console.log(`Erro (getTopTracks): ${e}`)
            console.log(e)
            if(e.errno == -4039){
                error = true
                await getTopTracks(albumMbid, albumName, artistName)
            }
        })
    if (!error)
        if (albumTracks && albumTracks.length != 0)
            await allTracks(albumMbid, artistName, albumTracks)
}
async function allTracks(albumMbid, artistName, albumTracks) {
    /*
    Essa funcao percorre o array de objetos de musicas.
    Informacoes adquiridas: Nome e Url da musica.
    */
    if (Array.isArray(albumTracks)) {
        for (let track of albumTracks) {
            encodedMusicName = encodeURI(track.name)
            musicName = track.name
            musicUrl = track.url || null
            await trackGetInfo(musicName, musicUrl, albumMbid, artistName)
        }
    } else {
        musicName = albumTracks.name
        musicUrl = albumTracks.url
        await trackGetInfo(musicName, musicUrl, albumMbid, artistName)
    }
}

async function trackGetInfo(musicName, musicUrl, albumMbid, artistName) {
    /*
    Essa funcao utiliza a URL: track.getinfo.
    Tem o objetivo de adquirir mais informacoes sobre uma determinada musica.
    Informacoes adquiridas: Mbid, biografia, generos da musica.
    Em seguida a funcao da continuidade ao encadeamento.
    */
   encodedArtistName = artistName
   encodedMusicName = musicName
    await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=d3fa18ca96490032eea33ffb8bf42b6f&artist=${encodedArtistName}&track=${encodedMusicName}&format=json`)
        .then(res => {
            if (res.data.error)
                console.log(res.data)
            error = false
            musicMbid = res.data.track.mbid || null
            musicBiography = res.data.track.wiki ? res.data.track.wiki.summary : null
            musicTag = res.data.track.toptags ? res.data.track.toptags.tag : null
            if (musicTag) {
                if (Array.isArray(musicTag)) {
                    for (let i = 0; i < musicTag.length; i++) {
                        if (i != (musicTag.length - 1))
                            musicGenres.push(`${musicTag[i].name},`)
                        else
                            musicGenres.push(musicTag[i].name)
                    }
                } else {
                    musicGenres.push(musicTag.name)
                }
            }
        })
        .catch(async e => {
            console.log(`Erro (trackGetInfo): ${e}`)
            if(e.errno == -4039){
                error = true
                await trackGetInfo(musicName, musicUrl, albumMbid, artistName)
            }
        })
    if (!error) {
        if (musicMbid)
            await getUrlYoutube(musicMbid, musicName, musicBiography, musicUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName)
        else {
            musicMbid = createNewMbid()
            await getUrlYoutube(musicMbid, musicName, musicBiography, musicUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, true)
        }
    }
}



module.exports.getTopTracks = getTopTracks