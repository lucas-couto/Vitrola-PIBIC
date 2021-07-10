const {Principal} = require('./Recom1/Recom1')

async function startRecommendations(musicsArray) {
    await Principal(musicsArray)
}
module.exports.startRecommendations = startRecommendations
