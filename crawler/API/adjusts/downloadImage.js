// Importando biblioteca.
const puppeteer = require('puppeteer')

// As funções importadas para colocar as informaçoes no banco de dados.
const { putArtistDB } = require('../../database/Tables/Artists/ArtistsCattegory')
const { putAlbumsDB } = require('../../database/Tables/Albums/AlbumsCattegory')
const { putMusicsDB } = require('../../database/Tables/Musics/MusicsCattegory')

// Declarando variaveis.
let correctArtistName
let artistDirectoryImage
let artistImageForFrontEnd
let correctAlbumName
let albumImageDirectory
let albumImageForFrontEnd
let correctMusicName
let musicGenre
let musicImageDirectory
let musicImageForFrontEnd
let browser
let page

//Essa funcao tem o objetivo de criar o diretorio da imagem do artista.
async function downloadImageArtists(artistMbid, artistName, artistBiography, artistUrl, artistImageUrl, principalArtistMbid, withoutMbidParam) {
    correctArtistName = artistName.replace(/ /g, "_").replace(/[^0-9a-zA-Z]/g, '')
    artistDirectoryImage = `../photos/artist/${correctArtistName}.jpeg`
    artistImageForFrontEnd = `/artist/${correctArtistName}.jpeg`
    await screenshotPuppeteer(artistImageUrl, artistDirectoryImage, 'artist')
    await putArtistDB(artistMbid, artistName, artistBiography, artistUrl, artistImageForFrontEnd, principalArtistMbid, withoutMbidParam)
}

//Essa funcao tem o objetivo de criar o diretorio da imagem do album.
async function downloadImageAlbums(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageUrl, artistMbid, artistName, withoutMbidParam) {
    correctAlbumName = albumName.replace(/ /g, "_").replace(/[^0-9a-zA-Z]/g, '')
    albumImageDirectory = `../photos/album/${correctAlbumName}.jpeg`
    albumImageForFrontEnd = `/album/${correctAlbumName}.jpeg`
    await screenshotPuppeteer(albumImageUrl, albumImageDirectory, 'album')
    await putAlbumsDB(albumMbid, albumName, albumBiography, albumUrl, albumReleaseDate, albumImageForFrontEnd, artistMbid, artistName, withoutMbidParam)
}


//Essa funcao tem o objetivo de criar o diretorio da imagem da musica.
async function downloadImageMusics(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageUrl, musicGenres, artistName, albumMbid, withoutMbidParam) {
    correctMusicName = musicName.replace(/ /g, "_").replace(/[^0-9a-zA-Z]/g, '')
    if (correctMusicName.includes('/'))
        correctMusicName = correctMusicName.replace("/", "_")
    musicGenre = ''
    musicImageDirectory = `../photos/music/${correctMusicName}.jpeg`
    musicImageForFrontEnd = `/music/${correctMusicName}.jpeg`
    musicGenres.forEach(genre => {
        musicGenre = musicGenre + ` ${genre}`
    });
    await screenshotPuppeteer(musicImageUrl, musicImageDirectory, 'music')
    await putMusicsDB(musicMbid, musicName, musicBiography, musicYoutubeUrl, musicReleaseDate, musicImageForFrontEnd, musicGenre, artistName, albumMbid, withoutMbidParam)
}

// Essa funcao tem o objetivo de tirar um print da pagina de uma determinada imagem e colocar o print em um diretorio.
async function screenshotPuppeteer(url, path, type) {
    if (url) {
        if (type == 'artist') {
            try{
                browser = await puppeteer.launch()
                page = await browser.newPage()
                await page.goto(url)
                await page.screenshot({ path: path, clip: { x: 275, y: 175, width: 250, height: 250 } })
                browser.close()
            }catch(e){
                console.log(e)
            }
        } else if (type == 'album') {
            try {                
                browser = await puppeteer.launch()
                page = await browser.newPage()
                await page.goto(url)
                await page.screenshot({ path: path, clip: { x: 312, y: 212, width: 174, height: 174 } })
                browser.close()
            } catch (e) {
                console.log(e)
            }
        } else if (type == 'music') {
            try {                
                browser = await puppeteer.launch()
                page = await browser.newPage()
                await page.goto(url)
                await page.screenshot({ path: path, clip: { x: 100, y: 0, width: 600, height: 600 } })
                browser.close()
            } catch (e) {
                console.log(e)
            }
        }
    }
}

/*
Exportando as funcoes
*/
module.exports.downloadImageArtists = downloadImageArtists
module.exports.downloadImageAlbums = downloadImageAlbums
module.exports.downloadImageMusics = downloadImageMusics

