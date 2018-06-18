import { STEP } from '../actions/CheckoutAction'

let initialState = {
    step: 0
}

export const CheckoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case STEP:
            return {
                ...state,
                step: action.payload
            }
        default:
            return state;
    }
}
