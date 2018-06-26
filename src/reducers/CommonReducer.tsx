import { UPDATE_COMMON, GET_LOCATION_FULFILLED } from '../actions/CommonAction'

declare let window: any;

export let initialState = {
  userForm: {
    name: ''
  }
}

export const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMON:
      return {
        ...state,
        ...action.payload
      }
    case GET_LOCATION_FULFILLED:
      console.log('action.payload', action.payload);
      return {
        ...state,        
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
