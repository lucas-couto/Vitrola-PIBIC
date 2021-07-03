// Importando bibliotecas.
const cheerio = require('cheerio')
const rp = require('request-promise');

// Importando as funcoes de outros arquivos.
const releaseDate = require('./releaseDate')

// Declarando variaveis.
let options

// A função entra dentro do site 'musicUrl' e acha o url do youtube, investigando o html da pagina e retornando a url pronta.
async function getUrlYoutube(musicMbid, musicName, musicBiography, musicUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, withoutMbidParam) {
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
            console.log(`Erro(getUrlYotutube): ${e}`)
        })
    if (musicYoutubeUrl)
        await releaseDate.releaseDateMusic(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, withoutMbidParam)
}

module.exports = { getUrlYoutube }

