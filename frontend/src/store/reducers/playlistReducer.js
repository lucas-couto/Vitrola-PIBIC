let playlistMusics = JSON.parse(localStorage.getItem('playlistMusics'))
const INITIAL_STATE = {
    playlistMusics
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'addPlaylistMusic':
            return {
                ...state,
                playlistMusics: action.payload,
                musicExist: false,
            }
        case 'removePlaylistMusic':
            return {
                ...state,
                playlistMusics: action.payload
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