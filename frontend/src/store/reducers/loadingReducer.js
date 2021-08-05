const INITIAL_STATE = {
    loadingMusic: false,
    loadingApp: false,
    loadingRecommendation: false 
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOADING_APP':
            return {
                ...state,
                loadingApp: true
            }
        case 'SEARCH':
            return {
                ...state,
                loadingApp: action.payload.loadingApp
            }
        case 'LOADING_MUSIC':
            return {
                ...state,
                loadingMusic: true
            }
        case 'ALBUM':
            return {
                ...state,
                loadingMusic: action.payload.loadingMusic
            }
        case 'LOADING_RECOMMENDATION':
            return{
                ...state,
                loadingRecommendation: true
            }
        case 'RECOMMENDATION':
            return{
                ...state,
                loadingRecommendation: action.loadingRecommendation
            }
        default:
            return state
    }
}