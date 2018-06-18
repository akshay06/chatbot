import {
  IDLE,
  NEW_USER_FULFILLED,
  LOGIN_FULFILLED,
  LOGOUT_FULFILLED,
  REGISTER_FULFILLED,
  OPENAUTHMODAL,
  FORGOTPASSWORDMODAL,
  SHOWREGISTERMODAL,
  SHOWOTPMODAL,
  FORGOT_PASSWORD_FULFILLED,
  OTPMOBILE,
  RESET_EMAIL_SENT,
  NEW_USER_EMPTY,
  RESET_AUTH_DETAILS
} from "../actions/AuthAction";

import { getFromCookie } from "./../utils"

const initialState = {
  idle: true,
  newUser: {
    message: false
  },
  login: undefined,
  loginError: undefined,
  logout: false,
  isLoggedIn: false,
  openauthModal: false,
  openforgotpasswordModal: false,
  openregisterModal: false,
  openotpModal: false,
  forgot: false,
  emailSent: false,
  otp: undefined,
  startResendTimer: undefined,
  otpLogin: undefined,
  otpMobile: undefined,
  haveOTPAttempts: true,
  regMissCreds: undefined,
  open_missing_login_info_collector_wizard: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case IDLE:
      return {
        ...state,
        idle: action.payload
      }
    case NEW_USER_FULFILLED:
      return {
        ...state,
        newUser: action.payload
      };
    case LOGIN_FULFILLED:
      // const data = getFromCookie("Access-Token") ? getFromCookie("authData") : action.payload
      return {
        ...state,
        login: action.payload, //dont use this data for any purpose
        loginError: action.payload,
        isLoggedIn: (action.payload && action.payload.email) || getFromCookie("Access-Token") ? true : false
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        login: action.payload,
        register: action.payload,
        isLoggedIn: (action.payload && action.payload.email) ? true : false
      }
    case OPENAUTHMODAL:
      return {
        ...state,
        openauthModal: action.payload,
        login: (!action.payload && (state.login && state.login.error)) ? undefined : state.login,
        openforgotpasswordModal: false,
        openregisterModal: false,
        openotpModal: false,
        open_missing_login_info_collector_wizard: false,
      };
    case FORGOTPASSWORDMODAL:
      return {
        ...state,
        openauthModal: false,
        openforgotpasswordModal: action.payload,
        openregisterModal: false,
        openotpModal: false,
      };
    case FORGOT_PASSWORD_FULFILLED:
      return {
        ...state,
        forgot: action.payload,
        emailSent: action.payload.message ? true : false
      }
    case OTPMOBILE:
      return {
        ...state,
        otpMobile: action.payload
      }
    case SHOWREGISTERMODAL:
      return {
        ...state,
        openauthModal: false,
        openforgotpasswordModal: false,
        openregisterModal: action.payload,
        openotpModal: false,
      };
    case SHOWOTPMODAL:
      return {
        ...state,
        openauthModal: false,
        openforgotpasswordModal: false,
        openregisterModal: false,
        openotpModal: action.payload,
      };
    case LOGOUT_FULFILLED:
      return {
        ...state,
        newUser: {
          message: false,
        },
        otpMobile: undefined,
        login: undefined,
        loginError: undefined,
        logout: true,
        isLoggedIn: false
      };
    case RESET_EMAIL_SENT:
      return {
        ...state,
        emailSent: false
      };
    case NEW_USER_EMPTY:
      return {
        ...state,
        newUser: { message: false }
      };
    case RESET_AUTH_DETAILS:
      return {
        ...initialState,
        isLoggedIn: state.isLoggedIn
      };
    default:
      return state;
  }
};
