----------------------------------------------------------------
                    28/03/2021
    Projeto da Universidade Estadual de Maringá(UEM)
        Orientador: Marcos Aurélio Domingues
        Aluno: Lucas Silva Couto
----------------------------------------------------------------

..\frontend\public\photos\albums - Fotos de todos os albuns da aplicação.
..\frontend\public\photos\artists - Fotos de todos os artistas da aplicação.
..\frontend\public\photos\musics - Fotos de todas as musicas da aplicação.

..\frontend\src\Biography\Biography.css - Estilização do componente Biography.
..\frontend\src\Biography\Biography.jsx - Estruturação do componente Biography.
..\frontend\src\Biography\Albums\Albums.css - Estilização do componente Albums.
..\frontend\src\Biography\Albums\Albums.jsx - Estruturação do componente Albums.
..\frontend\src\Biography\Albums\Musics\Musics.css - Estilização do componente Musics.
..\frontend\src\Biography\Albums\Musics\Musics.jsx - Estruturação do componente Musics.

..\frontend\src\Footer\adjusts\Control.js - Logica necessaria para o controle do fluxo das musicas.
..\frontend\src\Footer\adjusts\Duration.js - Logica necessaria para reconhecer a duração das musicas.
..\frontend\src\Footer\Footer.css - Estilização do componente Footer.
..\frontend\src\Footer\Footer.jsx - Estruturação do componente Footer.

..\frontend\src\Graph\Graph.css - Estilização do componente Graph.
..\frontend\src\Graph\Graph.jsx - Estruturação do componente Graph.

..\frontend\src\Header\Header.css - Estilização do componente Header.
..\frontend\src\Header\Header.jsx - Estruturação do componente Header.

..\frontend\src\Playlist\Playlist.css - Estilização do componente Playlist.
..\frontend\src\Playlist\Playlist.jsx - Estruturação do componente Playlist.
..\frontend\src\Playlist\UserPlaylist\UserPlaylist.css - Estilização do componente UserPlaylist.
..\frontend\src\Playlist\UserPlaylist\UserPlaylist.jsx - Estruturação do componente UserPlaylist.
..\frontend\src\Playlist\UserRecommendations\UserRecommendations.css - Estilização do componente UserRecommendations.
..\frontend\src\Playlist\UserRecommendations\UserRecommendations.jsx - Estruturação do componente UserRecommendations.


../frontend/src/store - Utilizado para realizar a distribuição das informações entre os componentes, feitas pela biblioteca Redux.
../frontend/src/store/actions/albumAction.js - Consumir as informações de um Album do backend.
../frontend/src/store/actions/artistAction.js - Consumir as informações de um Artista do backend.
../frontend/src/store/actions/musicAction.js - Consumir as informações de um Musica do backend.
../frontend/src/store/actions/playlistAction.js - Logica para adicionar ou remover musicas da playlist.
../frontend/src/store/actions/playMusicAction.js - Logica para tocar ou parar uma musica.
../frontend/src/store/actions/searchAction.js - Consumir qualquer informação do backend.
../frontend/src/store/reducers/albumReducer.js - Transportar as informações de um Album, consumido do backend, para os componentes especificos.
../frontend/src/store/reducers/artistReducer.js - Transportar as informações de um Artista, consumido do backend, para os componentes especificos.
../frontend/src/store/reducers/musicReducer.js - Transportar as informações de um Musica, consumido do backend, para os componentes especificos.
../frontend/src/store/reducers/playlistReducer.js - Trasportar o estado da playlist.
../frontend/src/store/reducers/playMusicReducer.js - Transportar o estado da musica(tocando ou parada).
../frontend/src/store/reducers/searchReducer.js - Transportar as informações requisitadas, consumida do backend, para os componentes especificos.
../frontend/src/store/storeConfig.js - Configuração do Redux.

../frontend/src/App.css - Estilização da aplicação.
../frontend/src/App.jsx - Estruturação da aplicação.

----------------------------------------------------------------
*IMPORTANTE*
- Para acessar as informações dos artistas/albuns/musicas, você deve executar o backend do diretorio ./backend -
----------------------------------------------------------------
Para conseguirmos rodar a aplicação devemos primeiramente baixar o NodeJS, no site https://nodejs.org/en/.
Durante a instalação vai ter uma etapa onde devemos colocar a opção 'ADD TO PATH' para facilitar a utilização do Node.
Depois de tudo instalado, entramos no diretório da pasta ./frontend no CMD ou Terminal do seu sistema operacional e utilizar o comando: npm install, para instalar as dependencias necessarias.
Depois de instalar todas as dependencias, digite o comando: npm start, para iniciar o servidor de desenvolvimento.