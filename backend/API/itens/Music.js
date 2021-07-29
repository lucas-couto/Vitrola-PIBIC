const { getAllArtistInformation } = require('./Artist')

// Relacionado Ao Banco de dados.
const Albums = require('../../Database/Albums/Albums')
const Musics = require('../../Database/Musics/Musics')
const Albums_Musics = require('../../Database/Relational Tables/Albums_Musics/Albums_Musics')
const Artists_Albums = require('../../Database/Relational Tables/Artists_Albums/Artists_Albums')

let exists
let paramsMusicMbid
let musicMbid
let musicName
let musicBiography
let musicImage
let musicYoutubeUrl
let musicReleaseDate
let albumMbid
let albumName
let artistMbid
/*
Essa API é responsavel por retornar as informações da Musica.
Para chamar essa API precisamos do Mbid da Musica.
*/
async function getAllMusicInformation(paramsMusicMbid) {
    await Musics.findOne({ where: { music_mbid: paramsMusicMbid } })
        .then(music => {
            if (music) {
                exists = true
                musicMbid = music.music_mbid
                musicName = music.name
                musicBiography = music.biography
                musicImage = music.directoryImage
                musicYoutubeUrl = music.urlYoutube
                musicReleaseDate = music.releaseDate
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
    await Albums_Musics.findOne({ where: { musics_mbid: musicMbid } })
        .then(albumMusic => {
            albumMbid = albumMusic.dataValues.albums_mbid
        })
        .catch(e => {
            console.log(e)
        })
    await Albums.findOne({ where: { album_mbid: albumMbid } })
        .then(album => {
            albumName = album.name
        })
        .catch(e => {
            console.log(e)
        })
    await Artists_Albums.findOne({ where: { albums_mbid: albumMbid } })
        .then(artistAlbum => {
            artistMbid = artistAlbum.dataValues.artist_mbid
        })
        .catch(e => {
            console.log(e)
        })
    return {
        title: 'Music',
        artist: await getAllArtistInformation(artistMbid),
        album: {
            albumMbid,
            albumName
        },
        music: {
            musicMbid,
            musicName,
            musicBiography,
            musicImage,
            musicYoutubeUrl,
            musicReleaseDate
        }
    }
}

/*
Essa API é responsavel por retornar as informações da Musica.
Para chamar essa API precisamos do Mbid da Musica.
Ela é utilizada para a aplicação se comunicar com ela mesma.
*/
async function Music(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    paramsMusicMbid = req.params.musicMbid
    res.json(await getAllMusicInformation(paramsMusicMbid))
}
module.exports = { Music, getAllMusicInformation }