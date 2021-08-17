const {Principal} = require('./Recom1/Recom1')

// Onde inicia as recomendacoes.
async function startRecommendations(musicsArray) {
    await Principal(musicsArray)
}
module.exports.startRecommendations = startRecommendations
