const getArtistSearch = require('../searchFunctions/artistSearch')

// Relacionado Ao Banco de dados.
const Albums = require('../../Database/Albums/Albums')
const Musics = require('../../Database/Musics/Musics')
const Albums_Musics = require('../../Database/Relational Tables/Albums_Musics/Albums_Musics')
const Artists_Albums = require('../../Database/Relational Tables/Artists_Albums/Artists_Albums')
const Artists = require('../../Database/Artists/Artists')

let paramsAlbumMbid
let exists
let artistMbid
let albumMbid
let albumName
let albumBiography
let albumReleaseDate
let albumImage
let albumMusics = []
let musicMbid
let musicName
let musicImage
let musicYoutubeUrl

/*
Essa API é responsavel por retornar todas as informações do Album.
Para chamar essa API precisamos do Mbid do Album.
*/
async function getAllAlbumInformation(paramsAlbumMbid) {
    await Albums.findOne({ where: { album_mbid: paramsAlbumMbid } })
        .then(album => {
            if (album) {
                exists = true
                albumMbid = album.album_mbid
                albumName = album.name
                albumBiography = album.biography
                albumReleaseDate = album.releaseDate
                albumImage = album.directoryImage
            } else {
                exists = false
            }
        })
        .catch(e => {
            console.log(e)
        })
    if (!exists) {
        return {
            title: 'NotFound'
        }
    }
    await Albums_Musics.findAll({ where: { albums_mbid: albumMbid } })
        .then(allMusics => {
            albumMusics = []
            allMusics.forEach(musicMbid => {
                albumMusics.push(musicMbid.musics_mbid)
            })
        })
        .catch(e => {
            console.log(e)
        })
    await Musics.findAll({ where: { music_mbid: albumMusics } })
        .then(allMusics => {
            albumMusics = []
            allMusics.forEach(music => {
                musicMbid = music.music_mbid
                musicName = music.name
                musicImage = music.directoryImage
                musicYoutubeUrl = music.urlYoutube
                albumMusics.push({ musicMbid, musicName, musicImage, musicYoutubeUrl })
            })
        })
        .catch(e => {
            console.log(e)
        })
    return {
        title: 'Album',
        album: {
            albumMbid,
            albumName,
            albumBiography,
            albumImage,
            albumReleaseDate,
            albumMusics
        }
    }
}


/*
Essa API é responsavel por retornar as informações do album.
Para chamar essa API precisamos do Mbid do Album.
Ela é utilizada para a aplicação se comunicar com ela mesma.
*/
async function Album(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    paramsAlbumMbid = req.params.albumMbid
    res.json(await getAllAlbumInformation(paramsAlbumMbid))
}

module.exports = { Album, getAllAlbumInformation }