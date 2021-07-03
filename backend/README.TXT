----------------------------------------------------------------
                    06/10/2020
    Projeto da Universidade Estadual de Maringá(UEM)
        Orientador: Marcos Aurélio Domingues
        Aluno: Lucas Silva Couto
----------------------------------------------------------------

..\backend\API\itens\Album.js - Uma API que retorna os dados do Album pesquisado.
..\backend\API\itens\Artist.js - Uma API que retorna os dados do Artista pesquisado.
..\backend\API\itens\Music.js - Uma API que retorna os dados do Musica pesquisado.

..\backend\API\Search.js - Responsavel por fazer a busca nas tabelas e retornar as informações necessarias em Json.

..\backend\Database\Albums\Albums.js - Conecta a tabela Albums.
..\backend\Database\Artists\Artists.js - Conecta a tabela Artists.
..\backend\Database\Musics\Musics.js - Conecta a tabela Musics.

..\backend\Database\Relational Tables\Albums_Musics\Albums_Musics.js - Conecta a tabela relacional Albums_Musics.
..\backend\Database\Relational Tables\Artists_Albums\Artists_Albums.js - Conecta a tabela relacional Artists_Albums.
..\backend\Database\Relational Tables\Artists_Similar\Artists_Similar.js - Conecta a tabela relacional Artists_Similar.


..\backend\Database\authentication.js - Faz a autenticação no banco de dados.
..\backend\Database\database.js - Faz a conexão com o banco de dados, passando as informações necessarias, como senha, nome do banco e a sua configuração.

..\backend\index.js - É o arquivo principal da aplicação.
..\backend\package.json - Onde são armazenadas as informações necessarias para rodar a aplicação.

----------------------------------------------------------------
A aplicação necessita do banco de dados MySQL.
Pode ser qualquer versão do MySQL, tudo o que precisamos é criar uma conexão MySQL.
Dentro da conexão criamos um database de qualquer nome.
Depois desse passo a passo, vamos para o arquivo ..\backend\Database\database.js e fazemos a substituição do codigo de acordo com o seu caso.
Dentro do arquivo ..\backend\Database\database.js explica como deve ser feita a substituição.

Para conseguirmos rodar a aplicação devemos primeiramente baixar o NodeJS, no site https://nodejs.org/en/.
Durante a instalação vai ter uma etapa onde devemos colocar a opção 'ADD TO PATH' para facilitar a utilização do Node.
Depois de tudo instalado, entramos no diretório da pasta ./backend no CMD ou Terminal do seu sistema operacional e utilizar o comando: npm install, para instalar as dependencias necessarias.
Depois de instalar todas as dependencias, digite o comando: npm start, para iniciar o servidor local do backend.