let imageDirectory
const fs = require('fs')

/*
Essa API é responsavel por retornar a imagem de um Artista, Album ou Musica.
Para chamar essa API precisamos do diretorio do imagem.
*/
function Images(req, res) {
    imageDirectory = req.query.imageDirectory
    if (fs.existsSync(`../../../photos${imageDirectory}`))
        res.sendFile(`/photos${imageDirectory}`, { root: '../' })
    else {
        if (imageDirectory.includes('/music') || imageDirectory.includes('/album'))
            res.sendFile(`/photos/music/principalMusicIcon.png`, { root: '../' })
        else
            res.sendFile(`/photos/artist/principalArtistIcon.png`, { root: '../' })

    }

}

module.exports = { Images }
