// Importando bibliotecas.
const puppeteer = require('puppeteer')

// Importando as funcoes de outros arquivos.
const releaseDate = require('./releaseDate')

// Declarando variaveis.
let browser
let page

// A função entra dentro do site 'musicUrl' e acha o url do youtube, investigando o html da pagina e retornando a url pronta.
async function getUrlYoutube(musicMbid, musicName, musicBiography, musicUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, withoutMbidParam) {
    try{
        browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
        page = await browser.newPage();
        await page.goto(musicUrl, {waitUntil: 'load'});
        musicYoutubeUrl = await page.$eval('a.play-this-track-playlink--youtube', res => res.href || null)
                                    .catch(e => console.log('Link nao encontrado!'))
        await page.close()
        await browser.close();
        if (musicYoutubeUrl)
            await releaseDate.releaseDateMusic(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, withoutMbidParam)
    }catch(e){
        console.log(`Erro (getUrlYoutube): ${e}`)
    }
}

module.exports = { getUrlYoutube }

