const INITIAL_STATE = null

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'FAVORITE_PLAYLIST' ||  action.type == 'FAVORITE_RECOMMENDATION')
        return action.type
    else
        return state
}