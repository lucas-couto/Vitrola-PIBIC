const withoutMbid = require('./withoutMbid')

let data
let hours
let minutes
// Colocar as informações no banco de dados.
async function putWithoutMbidDB(newMbid, name, artistName, type) {
    data = new Date()
    hours = data.getHours()
    minutes = data.getMinutes()
    await withoutMbid.create({
        newMbid: newMbid,
        name: name,
        artistName: artistName,
        type: type
    }).then(() => {
        console.log('\x1b[32m%s\x1b[0m', `${hours}:${minutes} - Item sem Mbid cadastrado!`)
    }).catch(e => {
        console.log(e)
    })
}


module.exports = { putWithoutMbidDB }