let musicObject
let playlist
let counter
let ifMusicExist
export function addPlaylistMusic(musicMbid, musicName, musicYoutubeUrl, musicDirectoryImage, albumName, albumMbid, artistName, artistMbid) {
    playlist = JSON.parse(localStorage.getItem('playlistMusics')) || []
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
        localStorage.setItem('playlistMusics', JSON.stringify(playlist))
        return {
            type: 'addPlaylistMusic',
            payload: playlist
        }
    }else{
        return {
            type: 'NULL'
        }
    }
}

export function removePlaylistMusic(musicMbid) {
    playlist = JSON.parse(localStorage.getItem('playlistMusics')) || []
    counter = 0
    for (counter; counter < playlist.length; counter++) {
        if (playlist[counter].musicMbid == musicMbid)
            break
    }
    playlist.splice(counter, 1)
    localStorage.setItem('playlistMusics', JSON.stringify(playlist))
    return {
        type: 'removePlaylistMusic',
        payload: playlist
    }
}