let imageDirectory
function Images(req, res) {
    imageDirectory = req.params.imageDirectory
    res.sendFile(`C:/Users/Lucas/Desktop/Projeto Facul/Projeto 1/Software/photos${imageDirectory}`)
}

module.exports = { Images }