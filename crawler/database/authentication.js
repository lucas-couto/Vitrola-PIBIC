const connection = require('./database')

// Autenticação do banco de dados.
const authenticate = connection.authenticate()
    .then(() => {
        console.log('Autenticação feita com sucesso')
    })
    .catch((e) => {
        console.log(`Falha na autenticação, erro: ${e}`)
    })

module.exports = authenticate