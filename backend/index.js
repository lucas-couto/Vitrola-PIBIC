// Importa as bibliotecas necessarias
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

// Autentica o banco de dados
const authenticate = require('./Database/authentication')
const connection = require('./Database/database')

// Importa outros arquivos 
const { Artist } = require('./API/itens/Artist')
const { ArtistAlbums } = require('./API/itens/ArtistAlbums')
const { ArtistSimilars } = require('./API/itens/ArtistSimilars')
const { Album } = require('./API/itens/Album')
const { Music } = require('./API/itens/Music')
const { Recommendation } = require('./API/itens/Recommendation')
const { Images } = require('./API/itens/Images')
const { Search } = require('./API/Search')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../frontend/build')))

// É utilizada para chamar as API das outras pastas
app.get('/search/:search', Search)
app.get('/artist/:artistMbid', Artist)
// app.get('/artist/albums/:artistMbid', ArtistAlbums)
// app.get('/artist/similars/:artistMbid', ArtistSimilars)
app.get('/album/:albumMbid', Album)
app.get('/music/:musicMbid', Music)
app.get('/music/recommendation/:playlistMusics', Recommendation)
app.get('/image/:imageDirectory', Images)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})
// Inicia a API na porta 3001 do localhost
app.listen(3001, () => {
  console.log('Backend HTTP rodando, porta 3001')
})