/* Utilizei um encadeamento de arquivos, onde o require e o module.exports são extremamente importantes */
/* O require importa: uma biblioteca, uma função de outro lugar, responsavel por todas as importaçoes */
/* O module.exports é responsavel por exportar uma função.*/
const Artist = require('./API/Artist')
const Recommendations = require('./recommendations/Recommendations')
const createTables = require('./database/createTables')

async function Crawler() {
    // Verifica se as tabelas existem, se nao existirem elas sao criadas.
    await createTables
    await Artist.startCrawler('china')
    await Recommendations.startRecommendations()
}
Crawler()
