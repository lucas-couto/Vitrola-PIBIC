let playlistMusic = JSON.parse(localStorage.getItem('playlistMusics'))
const INITIAL_STATE = {
    playlistMusic
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'addPlaylistMusic':
            return {
                ...state,
                playlistMusic: action.payload,
                musicExist: false,
            }
        case 'removePlaylistMusic':
            return {
                ...state,
                playlistMusic: action.payload
            }
        case 'NULL':
            return {
                ...state,
                musicExist: true
            }
        default:
            return state
    }
}