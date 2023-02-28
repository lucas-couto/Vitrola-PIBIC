const INITIAL_STATE = {
    principalArtist: null,
    similarArtists: null
}

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'GRAPH')
        return{
            principalArtist: action.payload.principalArtist, 
            similarArtists: action.payload.similarArtists
        }
    else
        return state
}