import axios from 'axios'
import apiKey from '../api'
let res

export default async albumMbid => {
    res = await axios.get(`${apiKey}/album/${albumMbid}`)
    return{
        type: 'ALBUM',
        payload: {
            albumName: res.data.album.name,
            albumMbid: res.data.album.mbid,
            albumImage: res.data.album.image,
            albumMusics: res.data.album.musics
        }
    }
}
