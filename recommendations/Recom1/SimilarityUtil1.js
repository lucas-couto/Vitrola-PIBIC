let principalTagsVector = []
let secondaryTagsVector = []
let principalBinaryVector = []
let secondaryBinaryVector = []
let arrayTag = []
let principalMusicTags
let secondaryMusicTags
let tagIndex
let dotProduct 
let leftNorm 
let rightNorm 
let result

// Essa funcao e responsavel por fazer a contagem e separacao das tags de duas musicas.
async function textSimilarity(principalMusic, secondaryMusic) {
    principalTagsVector = []
    secondaryTagsVector = []
    principalVectorBinary = []
    secondaryVectorBinary = []
    arrayTag = []
    principalMusicTags = principalMusic.musicGenre.split(',')
    secondaryMusicTags = secondaryMusic.musicGenre.split(',')
    for (let i = 0; i < principalMusicTags.length; i++){
        tagIndex = await searchTag(principalTagsVector, principalMusicTags[i])
        if(tagIndex == null)
        {
            principalTagsVector.push({tag: principalMusicTags[i], amount: 1})
            arrayTag.push(principalMusicTags[i])
        }else{
            principalTagsVector[tagIndex].amount++
        }
    }
    for (let i = 0; i < secondaryMusicTags.length; i++) {
        tagIndex = await searchTag(secondaryTagsVector, secondaryMusicTags[i])
        if(tagIndex == null)
        {
            secondaryTagsVector.push({tag: secondaryMusicTags[i], amount: 1})
            arrayTag.push(secondaryMusicTags[i])
        }else{
            secondaryTagsVector[tagIndex].amount++
        }
    }
    for (let i = 0; i < arrayTag.length; i++) {
        tagIndex = await searchTag(principalTagsVector, arrayTag[i])
        principalBinaryVector[i] = tagIndex == null ? 0 : principalTagsVector[tagIndex].amount
        tagIndex = await searchTag(secondaryTagsVector, arrayTag[i])
        secondaryBinaryVector[i] = tagIndex == null ? 0 : secondaryTagsVector[tagIndex].amount
    }
    result = await vectorSimilarity(principalBinaryVector, secondaryBinaryVector)
    return result
}

//Funcao responsavel pelo calculo de similaridade entre duas musicas.
async function vectorSimilarity(principalVector, secondaryVector) {
    dotProduct = 0
    leftNorm = 0
    rightNorm = 0
    for (let i = 0; i < principalVector.length; i++) {
        dotProduct += principalVector[i] * secondaryVector[i]
        leftNorm += principalVector[i] * principalVector[i]
        rightNorm += secondaryVector[i] * secondaryVector[i]
    }
    result = dotProduct / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm)) 
    return result
}
//Funcao responsavel por achar uma tag.
async function searchTag(tags, tagOne){
    for (let i = 0; i < tags.length; i++) {
        if(tagOne == tags[i].tag)
            return i
    }
    return null
}

module.exports = {textSimilarity}