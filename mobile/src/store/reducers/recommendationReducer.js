const INITIAL_STATE = {
    recommendationMusics : null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RECOMMENDATIONS':
            return {
                ...state,
                recommendationMusics: action.payload,
            }
        default:
            return state
    }
}