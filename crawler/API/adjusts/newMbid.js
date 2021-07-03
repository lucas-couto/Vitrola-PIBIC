// Biblioteca para a criação do mbid.
const crypto = require('crypto')

// Detalhes da implementação.
const prefixNewMbid = 'CBA_'
let newMbid

// Essa função é utilizada para criar o Mbid de uma informação que nao possui o Mbid, o prefixo sempre vai ser CBA_.
function createNewMbid(){
    newMbid = crypto.randomBytes(36).toString('hex')
    return prefixNewMbid + newMbid
}
// Exportando a funcao.
module.exports = {createNewMbid}
