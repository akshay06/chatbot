import { UPDATE_COMMON } from '../actions/CommonAction'
import { sendPageView } from '../lib/pixels';
import Header from '../containers/Home/Header';

declare let window: any;

export let initialState = {
  chatBotConfig: {
    // recognitionEnable: true,
    avatarStyle: {
      boxShadow: 'none'
    },
    userDelay: 0,
    enableMobileAutoFocus: true,
    bubbleStyle: {
      // borderRadius: '12px 12px 12px 0',
      boxShadow: '0 1px 12px 0 rgba(181, 192, 204, 0.5)',
      fontSize: '16px',
      marginTop: 0
    },
    submitButtonStyle: {
      background: '#abaebf',
      borderRadius: '50%',
      width: '36px',
      height: '36px',
      padding: '0 7px 0 11px',
      display: 'flex',
      fill: 'white',
      top: '8px',
      right: '8px',
    },
    headerComponent: Header(),
    botAvatar: 'https://image.ibb.co/mq0NPo/Screen_Shot_2018_06_22_at_1_13_28_AM.png',
    userAvatar: 'https://image.ibb.co/ieJOEo/Screen_Shot_2018_06_22_at_1_40_39_AM.png'
  },
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
