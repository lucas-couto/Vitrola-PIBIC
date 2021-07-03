const axios = require('axios')
const API = require('../api')
let playlist
let allMusicsMbid
export async function recommendation() {
    allMusicsMbid = []
    playlist = JSON.parse(localStorage.getItem('playlistMusics')) || []
    if (playlist.length != 0) {
        for (let i = 0; i < playlist.length; i++) {
            allMusicsMbid.push(playlist[i].musicMbid)
        }
        allMusicsMbid = JSON.stringify(allMusicsMbid)
        return await axios.get(`${API}/music/recommendation/${allMusicsMbid}`)
            .then(res => {
                return {
                    type: 'RECOMMENDATION',
                    payload: res.data
                }
            })
            .catch(e => {
                console.log(e)
            })
    } else {
        return {
            type: 'RECOMMENDATION',
            payload: null
        }
    }
}