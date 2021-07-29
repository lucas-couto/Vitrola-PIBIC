const Artists = require('../../Database/Artists/Artists')
let exists
/*
Essa API é responsavel por retornar apenas as informações essenciais de um artista.
Para chamar essa API precisamos do nome do artista.
Ela é utilizada somente para a pesquisa do usuario.
*/
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