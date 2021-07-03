// Importando biblitecas.
const axios = require('axios')

// Declarando variaveis.
let albumReleaseDate
let musicReleaseDate
let musicImageUrl


// Foi importado as funções responsaveis para colocar as informações no banco de dados
const downloadImage = require('./downloadImage')

// A função entra dentro do site 'albumUrl' e acha a data de lançamento do album, investigando o html da pagina e retornando a data pronta.
async function releaseDateAlbum(albumMbid, albumName, albumBiography, albumUrl, albumImageUrl, artistMbid, artistName, encodedArtistName, encodedAlbumName, withoutMbidParam) {
    await axios.get(`https://api.discogs.com/database/search?release_title=${encodedAlbumName}&artist=${encodedArtistName}&token=tVEEJAqjggFxrjegCcsuEzWXkFTUeHvYgovRpypL&per_page=2&page=1`)
        .then(res => {
            if (res.data.pagination.items != 0)
                albumReleaseDate = res.data.results[0].year
            else
                albumReleaseDate = null
        })
        .catch(e => {
            console.log(`Erro(releaseDateAlbum): ${e}`)
        })
    await downloadImage.downloadImageAlbums(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageUrl, artistMbid, artistName, withoutMbidParam)
}

/*
Essa função consome a API do Discogs.
Como a API do Last Fm nao retorna imagens corretas, utilizamos outra API para achar imagens.
Informacao adquirida: URL da imagem da musica.
Depois de todo esse processo, são chamadas outras funções para dar continuidade ao encadeamento.
*/
async function releaseDateMusic(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicGenres, artistName, albumMbid, encodedArtistName, encodedMusicName, withoutMbidParam) {
    await axios.get(`https://api.discogs.com/database/search?track=${encodedMusicName}&artist=${encodedArtistName}&token=tVEEJAqjggFxrjegCcsuEzWXkFTUeHvYgovRpypL&per_page=2&page=1`)
        .then(res => {
            if (res.data.pagination.items != 0) {
                musicReleaseDate = res.data.results[0].year
                musicImageUrl = res.data.results[0].cover_image
                if (musicImageUrl.includes('.gif'))
                    musicImageUrl = res.data.results[1].cover_image
            } else {
                musicReleaseDate = null
                musicImageUrl = null
            }
        })
        .catch(e => {
            console.log(`Erro(releaseDateMusic): ${e}`)
        })
    await downloadImage.downloadImageMusics(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageUrl, musicGenres, artistName, albumMbid, withoutMbidParam)
}

//Exportando funcoes.
module.exports.releaseDateAlbum = releaseDateAlbum
module.exports.releaseDateMusic = releaseDateMusic


