const Artists = require('../../Database/Artists/Artists')
let exists
async function getArtistSearch(name) {
    await Artists.findOne({ where: { name: name } })
        .then(artist => {
            if (artist) {
                exists = true
                artistMbid = artist.artist_mbid
                artistName = artist.name
                artistImage = artist.directoryImage
            } else {
                exists = false
            }
        })
        .catch(e => {
            console.log(e)
        })
    if (!exists) {
        return
    } else {
        return {
            type: 'artist',
            mbid: artistMbid,
            name: artistName,
            image: artistImage
        }
    }
}

module.exports = getArtistSearch