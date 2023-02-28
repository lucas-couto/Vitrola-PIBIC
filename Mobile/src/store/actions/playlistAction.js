import AsyncStorage from '@react-native-async-storage/async-storage';

let musicObject
let playlist
let counter
let ifMusicExist

export async function getPlaylist(){
    playlist = await AsyncStorage.getItem('playlist') || []
    if (playlist.length > 0)
        playlist = JSON.parse(playlist)
    return{
        type: 'GET_PLAYLIST',
        payload: playlist
    }   
}

export async function addPlaylistMusic(musicName, musicMbid, musicImage, youtubeUrl,  albumName) {
    playlist = await AsyncStorage.getItem('playlist') || []
    if (playlist.length > 0)
        playlist = JSON.parse(playlist)
    ifMusicExist = false
    for (let music of playlist) {
        if (music.musicMbid == musicMbid) {
            ifMusicExist = true
            break
        }
    }
    if (!ifMusicExist) {
        musicObject = {
            mbid: musicMbid,
            name: musicName,
            youtubeUrl,
            image: musicImage,
            albumName
        }
        playlist.push(musicObject)
        await AsyncStorage.setItem('playlist', JSON.stringify(playlist))
        return{
            type: 'ADD_PLAYLIST_MUSIC',
            payload: playlist
        }
    }
}

export async function removePlaylistMusic(musicMbid) {
    playlist = await AsyncStorage.getItem('playlist') || []
    playlist = JSON.parse(playlist)
    counter = 0
    for (counter; counter < playlist.length; counter++) {
        if (playlist[counter].mbid == musicMbid)
            break
    }
    playlist.splice(counter, 1)
    await AsyncStorage.setItem('playlist', JSON.stringify(playlist))
    return{
        type: 'REMOVE_PLAYLIST_MUSIC',
        payload: playlist
    }
}