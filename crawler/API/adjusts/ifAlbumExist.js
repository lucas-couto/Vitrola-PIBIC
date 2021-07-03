const Music = require('../Music')
const cheerio = require('cheerio')
const rp = require('request-promise');
const releaseDate = require('./releaseDate')
let musicUrl
let counter
async function ifAlbumExist(albumMbid, albumName, albumBiography, albumUrl, albumImageUrl, artistMbid, artistName, encodedArtistName, encodedAlbumName, albumTracks, withouMbidParam) {
    counter = 0
    if(Array.isArray(albumTracks)){
        for (let music of albumTracks) {
            await ifMusicHaveYoutubeUrl(music.url)
        }
    }else{
        musicUrl = albumTracks.url
        await ifMusicHaveYoutubeUrl(musicUrl)
    }
    if (counter != 0) {
        await releaseDate.releaseDateAlbum(albumMbid, albumName, albumBiography, albumUrl, albumImageUrl, artistMbid, artistName, encodedArtistName, encodedAlbumName, withouMbidParam)
    }
}

async function ifMusicHaveYoutubeUrl(musicUrl) {
    options = {
        uri: musicUrl,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    await rp(options)
        .then($ => {
            musicYoutubeUrl = $('a.play-this-track-playlink--youtube').attr('href')
        })
        .catch(e => {
            console.log(e)
        })
    if (musicYoutubeUrl)
        counter++
}

module.exports = { ifAlbumExist }