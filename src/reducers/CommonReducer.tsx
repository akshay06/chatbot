import { UPDATE_COMMON } from '../actions/CommonAction'
import { sendPageView } from '../lib/pixels';
declare let window: any;

export let initialState = {
    isMobile: false,
    isBot: false,
    deviceType:null,
    isAndroid:false,
    isIos:false,
    store:{}
}

export const CommonReducer = (state = initialState, action) => {
    switch (action.type) {        
        case UPDATE_COMMON:
            return {
                ...state,
                ...action.payload
            }
        case '@@router/LOCATION_CHANGE':
            if (typeof window !== 'undefined') {
                window.postMessage(action.payload.pathname, '*');
            }
            sendPageView(action.payload.pathname + action.payload.hash)
        default:
            return state;
    }
}
