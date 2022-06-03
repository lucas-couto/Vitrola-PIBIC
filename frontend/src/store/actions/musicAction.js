const axios = require('axios')
const API = require('../api')
export async function music(musicMbid) {
    return await axios.get(`${API}/music/${musicMbid}`)
        .then(res => {
            return {
                type: 'MUSIC',
                payload: {
                    albumMbid: res.data.album.mbid,
                    albumName: res.data.album.name,
                    musicMbid: res.data.music.mbid,
                    musicName: res.data.music.name,
                    musicYoutubeUrl: res.data.music.youtubeUrl,
                    playingMusic: true,
                    musicArray: null
                }
            }
        })
        .catch(e => {
            console.log(e)
        })
}