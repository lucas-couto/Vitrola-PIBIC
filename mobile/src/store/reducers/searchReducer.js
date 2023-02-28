const INITIAL_STATE = {
    artistName : null,
    artistMbid : null,
    artistImage : null,
    artistBiography: null,
    artistAlbums: null,
    similarArtists: null,
    notFound: false
}

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'SEARCH')
        return{
            artistName: action.payload.artistName,
            artistMbid: action.payload.artistMbid,
            artistImage: action.payload.artistImage,
            artistBiography: action.payload.artistBiography,
            artistAlbums: action.payload.artistAlbums,
            similarArtists: action.payload.similarArtists,
            notFound: action.payload.notFound
        }
    else
        return state
}