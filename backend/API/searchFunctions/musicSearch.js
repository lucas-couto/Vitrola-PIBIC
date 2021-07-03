const Albums_Musics = require('../../Database/Relational Tables/Albums_Musics/Albums_Musics')
const Artists_Albums = require('../../Database/Relational Tables/Artists_Albums/Artists_Albums')
const Musics = require('../../Database/Musics/Musics')
let exists
async function getMusicSearch(name) {
    await Musics.findOne({ where: { name: name } })
        .then(music => {
            if (music) {
                exists = true
                musicMbid = music.music_mbid
                musicName = music.name
                musicImage = music.directoryImage
            } else {
                exists = false
            }
        })
        .catch(e => {
            console.log(e)
        })
    if (!exists) {
        return
    }
    await Albums_Musics.findOne({ where: { musics_mbid: musicMbid } })
        .then(albumMusic => {
            albumMbid = albumMusic.dataValues.albums_mbid
        })
        .catch(e => {
            console.log(e)
        })
    await Artists_Albums.findOne({ where: { albums_mbid: albumMbid } })
        .then(artistAlbums => {
            artistMbid = artistAlbums.dataValues.artist_mbid
        })
        .catch(e => {
            console.log(e)
        })
    return {
        type: 'music',
        artistMbid,
        mbid: musicMbid,
        name: musicName,
        image: musicImage
    }
}

module.exports = getMusicSearch