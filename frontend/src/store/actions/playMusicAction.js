export function playMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray) {
    return {
        type: 'PLAY_MUSIC',
        payload: {
            musicYoutubeUrl,
            musicMbid,
            musicName,
            albumName,
            playingMusic: true,
            musicArray
        }
    }
}

export function stopMusic(musicYoutubeUrl, musicMbid, musicName, albumName, musicArray) {
    return {
        type: 'STOP_MUSIC',
        payload: {
            musicYoutubeUrl,
            musicMbid,
            musicName,
            albumName,
            playingMusic: false,
            musicArray
        }
    }
}