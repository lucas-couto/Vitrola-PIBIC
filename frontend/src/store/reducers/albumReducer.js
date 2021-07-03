const INITIAL_STATE = {
    albumMbid: null,
    albumName: null,
    albumBiography: null,
    albumImage: null,
    albumMusics: null
}


export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'ALBUM':
            return{
                ...state,
                albumMbid: action.payload.albumMbid,
                albumName: action.payload.albumName,
                albumBiography: action.payload.albumBiography,
                albumImage: action.payload.albumImage,
                albumMusics: action.payload.albumMusics
            }
        default:
            return state
    }
}