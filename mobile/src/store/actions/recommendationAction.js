import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
let playlist
let allMusicsMbid
let res
import api from '../api'


export default async () => {
    allMusicsMbid = []
    playlist = await AsyncStorage.getItem('playlist') || []
    if (playlist.length != 0) {
        playlist = JSON.parse(playlist)
        for (let i = 0; i < playlist.length; i++) {
            allMusicsMbid.push(playlist[i].mbid)
        }
        allMusicsMbid = JSON.stringify(allMusicsMbid)
        allMusicsMbid = encodeURI(allMusicsMbid)
        res = await axios.get(`${api}/music/recommendation/${allMusicsMbid}`).catch(e => { console.log(e) })
        return {
            type: 'RECOMMENDATIONS',
            payload: res.data
        }
    } else {
        return {
            type: 'RECOMMENDATIONS',
            payload: null
        }
    }
}

