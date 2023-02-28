const INITIAL_STATE = null

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'BODY_ARTIST' || action.type == 'BODY_GRAPH' || action.type == 'BODY_FAVORITES' || action.type == 'BODY_HOME')
        return action.type
    else if (action.type == 'SEARCH')
        return 'BODY_ARTIST'
    else
        return state
}
