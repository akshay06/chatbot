import { FETCH_FB_INSTA_COUNT_FULFILLED, SUBSCRIBE_USER_FULFILLED, SET_FOOTER_LOCAL } from '../actions/FooterAction'

let initialState = {
  showLoader: true,
  productGridObj: undefined,
  local : {
    toggleDropdown : {
      0 : false,
      1 : false
    }
  }
}

export const FooterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FB_INSTA_COUNT_FULFILLED:
      return {
        ...state,
        fbInstaCount: action.payload
      }    
    case SUBSCRIBE_USER_FULFILLED:
      return {
        ...state,
        subscribedUser: action.payload
      }    
    case SET_FOOTER_LOCAL:
      return {
        ...JSON.parse(JSON.stringify(state)),
      local:Object.assign(state.local, action.payload)
      }    
    default:
      return state;
  }
}