const INITIAL_STATE = {
    playlistMusics: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_PLAYLIST':
            return {
                ...state,
                playlistMusics: action.payload,
            }
        case 'ADD_PLAYLIST_MUSIC':
            return {
                ...state,
                playlistMusics: action.payload,
            }
        case 'REMOVE_PLAYLIST_MUSIC':
            return {
                ...state,
                playlistMusics: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}