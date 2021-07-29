const getArtistSearch = require('./searchFunctions/artistSearch')
const getAlbumSearch = require('./searchFunctions/albumSearch')
const getMusicSearch = require('./searchFunctions/musicSearch')

let search
let artist
let album
let music
/*
Essa API é responsavel por retornar as informacoes desejadas pelo usuario.
Para chamar essa API precisamos do nome de um artista, album ou musica.
Ela é utilizada somente para a pesquisa do usuario.
*/
async function searchAllInformations(name) {
    artist = await getArtistSearch(name)
    if(artist){
        return {
            title: 'Search',
            artist: artist,
        }
    }else{
        album = await getAlbumSearch(name)
        if(album){
            return {
                title: 'Search',
                album: album,
            }
        }else{
            music = await getMusicSearch(name)
            if(music){
                return{
                    title: 'Search',
                    music: music
                }
            }else{
                return{
                    title: 'NotFound',
                    notFound: true
                }
            }
        }
    }
}
/*
Essa API Get é responsavel de identificar o que cada busca é, se é um Artista, um Album, ou uma Musica.
Ela trabalha com prioridade, o primeiro item que buscamos no banco de dados é o Artista, se não existir buscamos na tabela Albums e se nao existir na tabela Album, vamos para a tabela Musica.
Depois de buscar no banco de dados, a API retorna um Json das informações mais importantes.
No caso dos Artistas ele retorna informações do artista pesquisado, seus similares e seus albuns.
Nos Albums, retorna o artista que fez o album, informações do album e as musicas que contem nele.
E Nas Musicas, retorna o album que a musica pertence e as informações da musica.
*/
async function Search(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    search = req.params.search
    res.json(await searchAllInformations(search))
}

module.exports = { Search }