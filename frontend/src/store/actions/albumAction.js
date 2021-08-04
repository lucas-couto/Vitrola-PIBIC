const axios = require('axios')
const API = require('../api')
export async function album(albumMbid) {
    return await axios.get(`${API}/album/${albumMbid}`)
        .then(res => {
            return {
                type: 'ALBUM',
                payload: {
                    albumMbid: albumMbid,
                    albumName: res.data.album.albumName,
                    albumBiography: res.data.album.albumBiography,
                    albumImage: res.data.album.albumImage,
                    albumMusics: res.data.album.albumMusics,
                    loadingMusic: false
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}