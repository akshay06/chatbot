import { SET_404, SET_500 } from '../actions/ErrorAction'

let initialState = {
    is404: false,
    is500: false
}

export const ErrorReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_404:
            return {
                ...state,
                is404: action.payload
            }
        case SET_500:
            return {
                ...state,
                is404: action.payload
            }
        default:
            return state;
    }
}
