let imageDirectory

/*
Essa API é responsavel por retornar a imagem de um Artista, Album ou Musica.
Para chamar essa API precisamos do diretorio do imagem.
*/
function Images(req, res) {
    imageDirectory = req.query.imageDirectory
    res.sendFile(`/photos${imageDirectory}`, {root: '../'})
}

module.exports = { Images }