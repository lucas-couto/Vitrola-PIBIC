const puppeteer = require('puppeteer')
const releaseDate = require('./releaseDate')
let musicUrl
let counter
let browser
let page
// Essa funcao e responsavel para ver se o album tem pelo menos uma musica com URL do youtube.
async function ifAlbumExist(albumMbid, albumName, albumBiography, albumUrl, albumImageUrl, artistMbid, artistName, encodedArtistName, encodedAlbumName, albumTracks, withouMbidParam) {
    counter = 0
    if(Array.isArray(albumTracks)){
        for (let music of albumTracks) {
            await ifMusicHaveYoutubeUrl(music.url)
            if(counter != 0)
                break;
        }
    }else{
        musicUrl = albumTracks.url
        await ifMusicHaveYoutubeUrl(musicUrl)
    }
    if (counter != 0) {
        await releaseDate.releaseDateAlbum(albumMbid, albumName, albumBiography, albumUrl, albumImageUrl, artistMbid, artistName, encodedArtistName, encodedAlbumName, withouMbidParam)
    }
}
// Essa funcao e responsavel por verificar se a musica tem URL para o youtube.
async function ifMusicHaveYoutubeUrl(musicUrl) {
    try{
        browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'})
        page = await browser.newPage()
        await page.goto(musicUrl, {waitUntil: 'load', timeout: 0})
        musicYoutubeUrl = await page.$eval('a.play-this-track-playlink--youtube', res => res.href || null)
                                    .catch(e => console.log('Link nao encontrado!'))
        await page.close()
        await browser.close()
        if (musicYoutubeUrl)
            counter++
    }catch(e){
        console.log(`Erro (ifMusicHaveYoutubeUrl):${e}`)
    }
}

module.exports = { ifAlbumExist }