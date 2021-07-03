const Albums = require('../../Database/Albums/Albums')
const Artists_Albums = require('../../Database/Relational Tables/Artists_Albums/Artists_Albums')

let artistAlbums
let albumMbid
let albumName
let albumImage

async function getAllArtistAlbumsInformation(paramsArtistMbid) {
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
    return artistAlbums
}



async function ArtistAlbums(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    paramsArtistMbid = req.params.artistMbid
    result = await getAllArtistAlbumsInformation(paramsArtistMbid)
    res.json({
        title: 'ArtistAlbums',
        Albums: result
    })
}

module.exports = {ArtistAlbums}