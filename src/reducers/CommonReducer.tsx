import { UPDATE_COMMON, GET_LOCATION_FULFILLED, SUBMIT_FORM_FULFILLED } from '../actions/CommonAction'

declare let window: any;

export let initialState = {
  geoLocation: undefined,
  userForm: {
    name: undefined,
  },
}

export const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMON:
      return {
        ...state,
        ...action.payload
      }
    case GET_LOCATION_FULFILLED:
      return {
        ...state, 
        geoLocation: action.payload.results
      }
    case SUBMIT_FORM_FULFILLED:
      console.log('alalalala', action.payload);
      return {
        ...state, 
        formResponse: action.payload
      }
    // case '@@router/LOCATION_CHANGE':
    //   if (typeof window !== 'undefined') {
    //     window.postMessage(action.payload.pathname, '*');
    //   }
    //   sendPageView(action.payload.pathname + action.payload.hash)
    default:
      return state;
  }
}
