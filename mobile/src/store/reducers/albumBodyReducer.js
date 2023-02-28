const INITIAL_STATE = 'ALBUM_MENU'

export default (state = INITIAL_STATE, action) =>{
    if(action.type == 'ALBUM_MUSICS' ||  action.type == 'ALBUM_MENU')
        return action.type
    else
        return state
}