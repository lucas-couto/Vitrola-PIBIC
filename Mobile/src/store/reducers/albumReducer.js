const INITIAL_STATE = {
    albumName: null,
    albumMbid: null,
    albumImage: null,
    albumMusics: null
}

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'ALBUM')
        return {
            ...state,
            albumName: action.payload.albumName,
            albumMbid: action.payload.albumMbid,
            albumImage: action.payload.albumImage,
            albumMusics: action.payload.albumMusics
        }
    else
        return state
}