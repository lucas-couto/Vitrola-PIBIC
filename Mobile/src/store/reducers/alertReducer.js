const INITIAL_STATE = {
    artistNotFoundAlert: false
}

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'SEARCH')
        return{
            artistNotFoundAlert: action.payload.notFound
        }
    else if (action.type == 'NOT_FOUND')
        return{
            ...state,
            artistNotFoundAlert: action.payload.notFound
        }
    else if (action.type == 'DISABLE_ARTIST_NOT_FOUND_ALERT')
        return{
            ...state,
            artistNotFoundAlert: false
        }
    else
        return state
}