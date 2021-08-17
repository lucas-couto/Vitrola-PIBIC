const axios = require('axios')
const API = require('../api')
export async function music(musicMbid) {
    return await axios.get(`${API}/music/${musicMbid}`)
        .then(res => {
            return {
                type: 'MUSIC',
                payload: {
                    albumMbid: res.data.album.albumMbid,
                    albumName: res.data.album.albumName,
                    musicMbid: res.data.music.musicMbid,
                    musicName: res.data.music.musicName,
                    musicYoutubeUrl: res.data.music.musicYoutubeUrl,
                    playingMusic: true,
                    musicArray: null
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}