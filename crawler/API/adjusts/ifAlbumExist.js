const puppeteer = require('puppeteer')
const releaseDate = require('./releaseDate')
let musicUrl
let counter
let browser
let page
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
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(musicUrl);
    musicYoutubeUrl = await page.$eval('a.play-this-track-playlink--youtube', res => res.href)
    await browser.close();
    if (musicYoutubeUrl)
        counter++
}

module.exports = { ifAlbumExist }