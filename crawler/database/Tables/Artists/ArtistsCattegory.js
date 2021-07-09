const Artists = require('./Artists')
const Album = require('../../../API/Album')
const Similar = require('../../../API/similarArtist')
const withoutMbid = require('../withoutMbid/withoutMbid')
const { putWithoutMbidDB } = require('../withoutMbid/withoutMbidCattegory')
const { putSimilarRLDB } = require('../Relational_Tables/Artists_Similar/Artists_SimilarCattegory')


let newArtistMbid
let existArtist
let hours
let minutes
// Colocar as informações no banco de dados.
async function putArtistDB(artistMbid, artistName, artistBiography, artistUrl, artistDirectoryImage, principalArtistMbid, withoutMbidParam) {
    newArtistMbid = null
    existArtist = false
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    if (withoutMbidParam) {
            existArtist = await Artists.findOne({where:{name: artistName, url: artistUrl}})
            if(!existArtist){
                await withoutMbid.findOne({ where: { name: artistName, type: 'artist' } })
                    .then(async artist => {
                        if (artist) {
                            console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Artista sem Mbid ja cadastrado!`)
                            newArtistMbid = artist.newMbid
                        } else {
                            await Artists.create({
                                artist_mbid: artistMbid,
                                name: artistName,
                                biography: artistBiography,
                                url: artistUrl,
                                directoryImage: artistDirectoryImage
                            }).then(() => {
                                console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Artista sem Mbid cadastrado com sucesso!`)
                            }).catch(e => {
                                console.log(e)
                            })
                            await putWithoutMbidDB(artistMbid, artistName, null, 'artist')
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }else{
                newArtistMbid = existArtist.dataValues.artist_mbid
            }
    } else {
        await Artists.findOne({ where: { artist_mbid: artistMbid } })
            .then(async artist => {
                if (artist) {
                    console.log('\x1b[31m%s\x1b[0m', `${hours}:${minutes} - Artista ja cadastrado!`)
                } else {
                    await Artists.create({
                        artist_mbid: artistMbid,
                        name: artistName,
                        biography: artistBiography,
                        url: artistUrl,
                        directoryImage: artistDirectoryImage
                    }).then(() => {
                        console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Artista cadastrado com sucesso!`)
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
            .catch(e => {
                console.log(`Erro(putAlbumsDB): ${e}`)
            })
    }
    await Album.getTopAlbums(newArtistMbid || artistMbid, artistName)
    if (principalArtistMbid)
        await putSimilarRLDB(principalArtistMbid, newArtistMbid || artistMbid)
    else
        await Similar.getSimilar(newArtistMbid || artistMbid, artistName)

}
module.exports = { putArtistDB }