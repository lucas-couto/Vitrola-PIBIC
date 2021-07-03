
// Relacionado Ao Banco de dados.
const Artists = require('../../Database/Artists/Artists')
const Albums = require('../../Database/Albums/Albums')
const Artists_Albums = require('../../Database/Relational Tables/Artists_Albums/Artists_Albums')
const Artists_Similar = require('../../Database/Relational Tables/Artists_Similar/Artists_Similar')

/*
Essa API é responsavel por retornar as informações do Artista.
Para chamar essa API precisamos do Mbid do Artista.
Ela é utilizada para a aplicação se comunicar com ela mesma.
*/

let exists
let paramsArtistMbid
let artistMbid
let artistName
let artistBiography
let artistImage
let similarArtists
let similarArtistName
let similarArtistMbid
let artistAlbums
let albumName
let albumMbid
let albumImage
let result
async function getAllArtistInformation(paramsArtistMbid) {
    await Artists.findOne({ where: { artist_mbid: paramsArtistMbid } })
        .then(artist => {
            if (artist) {
                exists = true
                artistMbid = artist.artist_mbid
                artistName = artist.name
                artistBiography = artist.biography
                artistImage = artist.directoryImage.replace('.', '')
            } else {
                exists = false
            }
        })
        .catch(e => {
            console.log(e)
        })
    if (!exists)
        return {
            title: 'NotFound'
        }
    await Artists_Similar.findAll({ where: { artist_mbid: paramsArtistMbid } })
        .then(allSimilarArtist => {
            similarArtists = []
            allSimilarArtist.forEach(similarMbid => {
                similarArtists.push(similarMbid.similarArtist_mbid)
            })
        })
        .catch(e => {
            console.log(e)
        })
    await Artists.findAll({ where: { artist_mbid: similarArtists } })
        .then(allSimilarArtists => {
            similarArtists = []
            allSimilarArtists.forEach(artist => {
                similarArtistName = artist.name
                similarArtistMbid = artist.artist_mbid
                similarArtists.push({ similarArtistMbid, similarArtistName })
            })
        })
        .catch(e => {
            console.log(e)
        })
    await Artists_Albums.findAll({ where: { artist_mbid: paramsArtistMbid } })
        .then(allAlbums => {
            artistAlbums = []
            allAlbums.forEach(albumMbid => {
                artistAlbums.push(albumMbid.albums_mbid)
            })
        })
        .catch(e => {
            console.log(e)
        })
    await Albums.findAll({ where: { album_mbid: artistAlbums } })
        .then(allAlbums => {
            artistAlbums = []
            allAlbums.forEach(album => {
                albumMbid = album.album_mbid
                albumName = album.name
                albumImage = album.directoryImage.replace('.', '')
                artistAlbums.push({ albumMbid, albumName, albumImage })
            })
        })
        .catch(e => {
            console.log(e)
        })
    return {
        artistMbid,
        artistName,
        artistBiography,
        artistImage,
        similarArtists,
        artistAlbums
    }
}

async function Artist(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    paramsArtistMbid = req.params.artistMbid
    result = await getAllArtistInformation(paramsArtistMbid)
    res.json({
        title: 'Artist',
        artist: result
    })
}
module.exports = { Artist, getAllArtistInformation }