const Albums = require('./Albums')
const withoutMbid = require('../withoutMbid/withoutMbid')
const Music = require('../../../API/Music')
const { putWithoutMbidDB } = require('../withoutMbid/withoutMbidCattegory')
const { putAlbumRLDB } = require('../Relational_Tables/Artists_Albums/Artists_AlbumsCattegory')

let newAlbumMbid
let existAlbum
let data
let hours
let minutes
// Colocar as informações no banco de dados.
async function putAlbumsDB(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageDirectory, artistMbid, artistName, withoutMbidParam) {
    newAlbumMbid = null
    existAlbum = false
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    if (withoutMbidParam) {
        newAlbumMbid = await putAlbumWithoutMibdDB(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageDirectory, artistName)
    } else {
        await putAlbumWithMibdDB(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageDirectory)
    }
    await putAlbumRLDB(artistMbid, newAlbumMbid || albumMbid)
    await Music.getTopTracks(newAlbumMbid || albumMbid, albumName, artistName)
}


async function putAlbumWithoutMibdDB(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageDirectory, artistName) {
    existAlbum = await withoutMbid.findOne({ where: { name: albumName, artistName: artistName, type: 'album' } })
    if (existAlbum) {
        return existAlbum.dataValues.newMbid
    } else {
        await Albums.create({
            album_mbid: albumMbid,
            name: albumName,
            biography: albumBiography,
            url: albumUrl,
            releaseDate: albumReleaseDate,
            directoryImage: albumImageDirectory
        }).then(() => {
            console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Album sem Mbid cadastrado com sucesso!`)
        }).catch(e => {
            console.log(e)
        })
        await putWithoutMbidDB(albumMbid, albumName, artistName, 'album')
        return null
    }
}
async function putAlbumWithMibdDB(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageDirectory) {
    existAlbum = await Albums.findOne({ where: { album_mbid: albumMbid } })
    if (existAlbum)
        console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Album já cadastrado!`)
    else {
        await Albums.create({
            album_mbid: albumMbid,
            name: albumName,
            biography: albumBiography,
            url: albumUrl,
            releaseDate: albumReleaseDate,
            directoryImage: albumImageDirectory
        }).then(() => {
            console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Album cadastrado com sucesso!`)
        }).catch(e => {
            console.log(e)
        })
    }
}

module.exports = { putAlbumsDB }