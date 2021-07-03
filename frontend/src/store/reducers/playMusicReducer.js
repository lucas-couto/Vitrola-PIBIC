const INITIAL_STATE = {
    musicYoutubeUrl: null,
    musicMbid: null,
    musicName: null,
    albumName: null,
    playingMusic: false,
    musicArray: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MUSIC':
            return{
                musicYoutubeUrl: action.payload.musicYoutubeUrl,
                musicMbid: action.payload.musicMbid,
                musicName: action.payload.musicName,
                albumName: action.payload.albumName,
                playingMusic: action.payload.playingMusic,
                musicArray: action.payload.musicArray
            }
        case 'PLAY_MUSIC':
            return {
                ...state,
                musicYoutubeUrl: action.payload.musicYoutubeUrl,
                musicMbid: action.payload.musicMbid,
                musicName: action.payload.musicName,
                albumName: action.payload.albumName,
                playingMusic: action.payload.playingMusic,
                musicArray: action.payload.musicArray
            }
        case 'STOP_MUSIC':
            return {
                ...state,
                musicYoutubeUrl: action.payload.musicYoutubeUrl,
                musicMbid: action.payload.musicMbid,
                musicName: action.payload.musicName,
                albumName: action.payload.albumName,
                playingMusic: action.payload.playingMusic,
                musicArray: action.payload.musicArray
            }
        default:
            return state
    }
}