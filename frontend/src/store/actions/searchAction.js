const axios = require('axios')
const API = require('../api')

// declarando variaveis
export async function search(name) {
    return await axios.get(`${API}/search/${name}`)
        .then(res => {
            return{
                type: 'SEARCH',
                payload: {
                    artist: res.data.artist,
                    album: res.data.album,
                    music: res.data.music
                }
            }
        })
        .catch(e =>{
            console.log(e)
        })
}