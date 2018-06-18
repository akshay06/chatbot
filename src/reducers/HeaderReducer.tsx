import { SET_LOCAL_HEADER } from '../actions/HeaderAction'


let initialState = {
    selectMenu: '',
    showSearch: false,
    isOpen: false,
    selectAccountMenu: false,
    showSearchDrpoDown: false,
}

export const HeaderReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_LOCAL_HEADER:
            return {
                ...state,
                ...JSON.parse(JSON.stringify(action.payload))
            }

        default:
            return state;
    }
}