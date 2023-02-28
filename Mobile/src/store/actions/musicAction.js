export const playMusic = (musicName, musicMbid, musicImage, youtubeURL, albumName, arrayMusics) => {
    return {
        type: 'PLAY_MUSIC',
        payload: {
            musicName,
            musicMbid,
            youtubeURL,
            musicImage,
            albumName,
            arrayMusics
        }
    }
}

export const stopMusic = (musicMbid) => {
    return {
        type: 'STOP_MUSIC',
        payload: {
            musicMbid,
        }
    }
}
