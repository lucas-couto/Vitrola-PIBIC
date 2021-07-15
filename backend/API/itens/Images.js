let imageDirectory
function Images(req, res) {
    imageDirectory = req.query.imageDirectory
    res.sendFile(`/photos${imageDirectory}`, {root: '../'})
}

module.exports = { Images }