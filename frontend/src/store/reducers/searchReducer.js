const INITIAL_STATE = {
    artist: null,
    album: null,
    music: null,
    notFound: false
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'SEARCH':
            return{
                ...state,
                artist: action.payload.artist,
                album: action.payload.album,
                music: action.payload.music,
                notFound: action.payload.notFound
            }
        default:
            return state
    }
}