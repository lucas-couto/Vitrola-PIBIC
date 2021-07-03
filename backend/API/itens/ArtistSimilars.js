const Artists_Similar = require('../../Database/Relational Tables/Artists_Similar/Artists_Similar')
const Artists = require('../../Database/Artists/Artists')

let similarArtists
async function getAllArtistSimilarsInformation(paramsArtistMbid){
    await Artists_Similar.findAll({ where: { artist_mbid: paramsArtistMbid } })
    .then(allSimilarArtist => {
        similarArtists = []
        allSimilarArtist.forEach(similarMbid => {
            similarArtists.push(similarMbid.similarArtist_mbid)
        })
    })
    .catch(e => {
        console.log(e)
    })
    await Artists.findAll({ where: { artist_mbid: similarArtists } })
    .then(allSimilarArtists => {
        similarArtists = []
        allSimilarArtists.forEach(artist => {
            similarArtistName = artist.name
            similarArtistMbid = artist.artist_mbid
            similarArtists.push({ similarArtistMbid, similarArtistName })
        })
    })
    .catch(e => {
        console.log(e)
    })
    return similarArtists
    
}

async function ArtistSimilars(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    paramsArtistMbid = req.params.artistMbid
    result = await getAllArtistSimilarsInformation(paramsArtistMbid)
    res.json({
        title: 'ArtistSimilars',
        Similars: result
    })
}

module.exports = {ArtistSimilars}