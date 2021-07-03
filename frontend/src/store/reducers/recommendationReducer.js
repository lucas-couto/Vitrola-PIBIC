const INITIAL_STATE = {
    recommendationMusic : null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RECOMMENDATION':
            return {
                ...state,
                recommendationMusic: action.payload,
            }
        default:
            return state
    }
}