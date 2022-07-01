let musicObject
let playlistMusics
let counter
let ifMusicExist
export function addPlaylistMusic(musicMbid, musicName, musicYoutubeUrl, musicDirectoryImage, albumName, albumMbid, artistName, artistMbid) {
    playlistMusics = JSON.parse(localStorage.getItem('playlistMusics')) || []
    ifMusicExist = false
    for(let music of playlistMusics) {
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
        playlistMusics.push(musicObject)
        localStorage.setItem('playlistMusics', JSON.stringify(playlistMusics))
        return {
            type: 'addPlaylistMusic',
            payload: playlistMusics
        }
    }else{
        return {
            type: 'NULL'
        }
    }
}

export function removePlaylistMusic(musicMbid) {
    playlistMusics = JSON.parse( localStorage.getItem('playlistMusics')) || []
    counter = 0
    for (counter; counter < playlistMusics.length; counter++) {
        if (playlistMusics[counter].musicMbid == musicMbid)
            break
    }
    playlistMusics.splice(counter, 1)
    localStorage.setItem('playlistMusics', JSON.stringify(playlistMusics))
    return {
        type: 'removePlaylistMusic',
        payload: playlistMusics
    }
}