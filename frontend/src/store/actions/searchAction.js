const axios = require('axios')
const API = require('../api')

// declarando variaveis
export async function search(name) {
    return await axios.get(`${API}/search/${name}`)
        .then(res => {
            if(res.data.artist || res.data.album || res.data.music){
                return{
                    type: 'SEARCH',
                    payload: {
                        artist: res.data.artist,
                        album: res.data.album,
                        music: res.data.music,
                        loadingApp: false
                    }
                }
            }else{
                return{
                    type: 'SEARCH',
                    payload: {
                        notFound: true,
                        loadingApp: false
                    }
                }
            }
        })
        .catch(e =>{
            console.log(e)
        })
}