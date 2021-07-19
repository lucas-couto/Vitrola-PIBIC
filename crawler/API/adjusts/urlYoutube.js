// Importando bibliotecas.
const puppeteer = require('puppeteer')

// Importando as funcoes de outros arquivos.
const releaseDate = require('./releaseDate')

// Declarando variaveis.
let browser
let page

// A função entra dentro do site 'musicUrl' e acha o url do youtube, investigando o html da pagina e retornando a url pronta.
async function getUrlYoutube(musicMbid, musicName, musicBiography, musicUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, withoutMbidParam) {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(musicUrl);
    musicYoutubeUrl = await page.$eval('a.play-this-track-playlink--youtube', res => res.href)
    await browser.close();
    if (musicYoutubeUrl)
        await releaseDate.releaseDateMusic(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, withoutMbidParam)
}

module.exports = { getUrlYoutube }

