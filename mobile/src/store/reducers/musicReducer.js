const INITIAL_STATE = {
    musicName: null,
    musicMbid: null,
    musicImage: null,
    youtubeURL: null,
    albumName: null,
    albumMusics: null,
    isPlaying: false,
    existMusic: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PLAY_MUSIC':
            return{
                ...state,
                musicName: action.payload.musicName,
                musicMbid: action.payload.musicMbid,
                musicImage: action.payload.musicImage,
                youtubeURL: action.payload.youtubeURL,
                albumName: action.payload.albumName,
                albumMusics: action.payload.arrayMusics,
                isPlaying: true,
                existMusic: true
            }
        case 'STOP_MUSIC':
            return{
                ...state,
                musicMbid: action.payload.musicMbid,
                isPlaying: false
            }
        case 'PUT_MUSIC_PLAYLIST':
            return{
                ...state,
                musicName: action.payload.musicName,
                musicMbid: action.payload.musicMbid,
                musicImage: action.payload.musicImage,
                youtubeURL: action.payload.youtubeURL,
                albumName: action.payload.albumName,
            }
        default:
            return{
                ...state
            }
    }
}