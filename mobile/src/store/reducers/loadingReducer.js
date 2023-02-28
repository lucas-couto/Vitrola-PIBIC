const INITIAL_STATE = {
    loadingHome: false,
    loadingRecommendations: false
}

export default (state = INITIAL_STATE, action) => {
    if (action.type == 'LOADING_HOME')
        return {
            ...state,
            loadingHome: true
        }
    else if (action.type == 'SEARCH' || action.type == 'NOT_FOUND')
        return {
            ...state,
            loadingHome: false
        }
    else if (action.type === 'LOADING_RECOMMENDATIONS')
        return {
            ...state,
            loadingRecommendations: true
        }
    else if (action.type === 'RECOMMENDATIONS')
        return {
            ...state,
            loadingRecommendations: false
        }
    else
        return state
}