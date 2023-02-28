const INITIAL_STATE = null

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'ARTIST_BIOGRAPHY' || action.type == 'ARTIST_ALBUMS' || action.type == 'ARTIST_MENU')
        return action.type
    else
        return state
}