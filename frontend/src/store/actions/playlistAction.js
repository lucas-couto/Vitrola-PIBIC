let musicObject
let playlist
let counter
let ifMusicExist
export async function addPlaylistMusic(musicMbid, musicName, musicYoutubeUrl, musicDirectoryImage, albumName, albumMbid, artistName, artistMbid) {
    playlist = await localStorage.getItem('playlist') || []
    ifMusicExist = false
    for(let music of playlist) {
        if (music.musicMbid == musicMbid) {
            ifMusicExist = true
            break
        }
    }
    if (!ifMusicExist) {
        musicObject = {
            musicMbid,
            musicName,
            musicYoutubeUrl,
            musicDirectoryImage,
            albumName,
            albumMbid,
            artistName,
            artistMbid
        }
        playlist.push(musicObject)
        await localStorage.setItem('playlist', JSON.stringify(playlist))
        return {
            type: 'ADD_PLAYLIST_MUSIC',
            payload: playlist
        }
    }else{
        return {
            type: 'NULL'
        }
    }
}

export async function removePlaylistMusic(musicMbid) {
    playlist = JSON.parse(await localStorage.getItem('playlist')) || []
    counter = 0
    for (counter; counter < playlist.length; counter++) {
        if (playlist[counter].musicMbid == musicMbid)
            break
    }
    playlist.splice(counter, 1)
    await localStorage.setItem('playlist', JSON.stringify(playlist))
    return {
        type: 'REMOVE_PLAYLIST_MUSIC',
        payload: playlist
    }
}