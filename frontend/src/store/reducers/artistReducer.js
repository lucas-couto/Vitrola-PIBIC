const INITIAL_STATE = {
    artistMbid: null,
    artistName: null,
    artistBiography: null,
    artistImage: null,
    similarArtists: null,
    artistAlbums: null
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case 'ARTIST':
            return{
                ...state,
                artistMbid: action.payload.artistMbid,
                artistName: action.payload.artistName,
                artistBiography: action.payload.artistBiography,
                artistImage: action.payload.artistImage,
                similarArtists: action.payload.similarArtists,
                artistAlbums: action.payload.artistAlbums
            }
        case 'ALBUM':
            return{
                ...state,
                artistMbid: action.payload.artistMbid,
                artistName: action.payload.artistName,
                artistBiography: action.payload.artistBiography,
                artistImage: action.payload.artistImage,
                similarArtists: action.payload.similarArtists,
                artistAlbums: action.payload.artistAlbums
            }
        case 'MUSIC':
            return{
                ...state,
                artistMbid: action.payload.artistMbid,
                artistName: action.payload.artistName,
                artistBiography: action.payload.artistBiography,
                artistImage: action.payload.artistImage,
                similarArtists: action.payload.similarArtists,
                artistAlbums: action.payload.artistAlbums
            }
        default:
            return state
    }
}