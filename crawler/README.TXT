----------------------------------------------------------------
                    28/03/2021
    Projeto da Universidade Estadual de Maringá(UEM)
        Orientador: Marcos Aurélio Domingues
        Aluno: Lucas Silva Couto
----------------------------------------------------------------

..\consumoAPI\API\adjusts\downloadImage.js - Tira um print de uma area da pagina onde contem a imagem procurada e coloca no computador.
..\consumoAPI\API\adjusts\ifAlbumExist.js - Verifica se no album existe pelo menos uma musica no youtube.
..\consumoAPI\API\adjusts\newMbid.js - Cria um Mbid aleatorio.
..\consumoAPI\API\adjusts\releaseDate.js - Pega a data de lançamento de um album ou musica.
..\consumoAPI\API\adjusts\urlYoutube.js - Pega o link do youtube de uma musica.

..\consumoAPI\API\Album.js - Consome o link dos albuns e coloca no banco de dados
..\consumoAPI\API\Artist.js - Consome o link dos artista e coloca no banco de dados
..\consumoAPI\API\Music.js - Consome o link das musicas e coloca no banco de dados
..\consumoAPI\API\similarArtist.js - Consome o link dos similares de um artista e coloca no banco de dados

..\consumoAPI\database\Tables\Albums\Albums.js - Cria e/ou conecta a tabela  Albums.
..\consumoAPI\database\Tables\Albums\AlbumsCattegory.js- Passa as informações para o banco de dados na tabela Albums.
..\consumoAPI\database\Tables\Artists\Artists.js - Cria e/ou conecta a tabela  Artists.
..\consumoAPI\database\Tables\Artists\ArtistsCattegory.js- Passa as informações para o banco de dados na tabela Artists.
..\consumoAPI\database\Tables\Musics\Musics.js - Cria e/ou conecta a tabela  Musics.
..\consumoAPI\database\Tables\Musics\MusicsCattegory.js- Passa as informações para o banco de dados na tabela Musics.

..\consumoAPI\database\Tables\Relational Tables\Albums_Musics\Albums_Musics.js - Cria e/ou conecta a tabela  relacional Albums_Musics.
..\consumoAPI\database\Tables\Relational Tables\Albums_Musics\Albums_MusicsCattegory.js - Passa as informações para o banco de dados na tabela relacional Albums_Musics.
..\consumoAPI\database\Tables\Relational Tables\Artists_Albums\Artists_Albums.js - Cria e/ou conecta a tabela  relacional Artists_Albums.
..\consumoAPI\database\Tables\Relational Tables\Artists_Albums\Artists_AlbumsCattegory.js - Passa as informações para o banco de dados na tabela relacional Artists_Albums.
..\consumoAPI\database\Tables\Relational Tables\Artists_Similar\Artists_Similar.js - Cria e/ou conecta a tabela  relacional Artists_Similar.
..\consumoAPI\database\Tables\Relational Tables\Artists_Similar\Artists_SimilarCattegory.js - Passa as informações para o banco de dados na tabela relacional Artists_Similar.

..\consumoAPI\database\createTables.js - Cria as tabelas e as relacionam.
..\consumoAPI\database\authentication.js - Faz a autenticação no banco de dados.
..\consumoAPI\database\database.js - Faz a conexão com o banco de dados, passando as informações necessarias, como senha, nome do banco e a sua configuração.

..\consumoAPI\index.js - É o arquivo principal da aplicação.
..\consumoAPI\package.json - Onde são armazenadas as informações necessarias para rodar a aplicação.

----------------------------------------------------------------
A aplicação necessita do banco de dados MySQL.
Pode ser qualquer versão do MySQL, tudo o que precisamos é criar uma conexão MySQL.
Dentro da conexão criamos um database de qualquer nome.
Depois desse passo a passo, vamos para o arquivo ..\consumoAPI\database\database.js e fazemos a substituição do codigo de acordo com o seu caso.
Dentro do arquivo ..\consumoAPI\database\database.js explica como deve ser feita a substituição.

Para conseguirmos rodar a aplicação devemos primeiramente baixar o NodeJS, no site https://nodejs.org/en/.
Durante a instalação vai ter uma etapa onde devemos colocar a opção 'ADD TO PATH' para facilitar a utilização do Node.
Depois de tudo instalado, entramos no diretório da pasta ./consumoAPI no CMD ou Terminal do seu sistema operacional e utilizar o comando: npm install, para instalar as dependencias necessarias.
Depois de instalar todas as dependencias, digite o comando: npm start, para iniciar o processo de preencher o banco de dados.
Caso queira completar, utilizar essa aplicação, recomendo que rode o arquivo de 6 em 6 meses, para completar com novos artistas e musicas.
----------------------------------------------------------------
Recomendações do desenvolvedor:
    Para cadastrar os artistas de varios ao mesmo tempo, eu criaria varias instancias de paises diferentes.
    Assim o sistema irá se completar mais rapidamente!