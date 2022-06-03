const axios = require('axios')
const API = require('../api')
export async function album(albumMbid) {
    return await axios.get(`${API}/album/${albumMbid}`)
        .then(res => {
            return {
                type: 'ALBUM',
                payload: {
                    albumMbid: albumMbid,
                    albumName: res.data.album.name,
                    albumBiography: res.data.album.biography,
                    albumImage: res.data.album.image,
                    albumMusics: res.data.album.musics,
                    loadingMusic: false
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}