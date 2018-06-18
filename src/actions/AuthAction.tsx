import { Api } from '../api'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/concat'
import { saveAccessCredentials, deleteToken } from '../utils'
import { gtmPush } from '../lib/pixels';

declare let window: any;

export const IDLE = 'IDLE'
export const idle = payload => ({ type: IDLE, payload })

export const NEW_USER = 'NEW_USER'
export const newUser = payload => ({ type: NEW_USER, payload })

export const NEW_USER_FULFILLED = 'NEW_USER_FULFILLED'
export const newUserFulfilled = payload => ({ type: NEW_USER_FULFILLED, payload })

export const OTPMOBILE = 'OTPMOBILE'
export const otpMobile = payload => ({ type: OTPMOBILE, payload })

export const newUserEpic = action$ => {
  return action$.ofType(NEW_USER).mergeMap(action => {
    return Api.get({ url: 'users/' + action.payload })
      .flatMap(response => Observable.concat(
        Observable.of(newUserFulfilled(response)),
        Observable.of(otpMobile(action.payload)),
        Observable.of(idle(true)),
      ))
  })
}

export const LOGIN = 'LOGIN'
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED'

export const LOGOUT = 'LOGOUT'
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED'

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_FULFILLED = 'FORGOT_PASSWORD_FULFILLED'

export const REGISTER = 'REGISTER'
export const REGISTER_FULFILLED = 'REGISTER_FULFILLED'


export const login = payload => ({ type: LOGIN, payload })
export const loginFulfilled = payload => ({ type: LOGIN_FULFILLED, payload })

export const loginEpic = action$ => {
  return action$.ofType(LOGIN)
    .mergeMap(action => {
      return Api.post({ url: 'authentication', postObj: action.payload })
        .flatMap((response) => {
          if (!response.error) {
            return Observable.concat(
              Observable.of(loginFulfilled(response)),
            )
          } else {
            return Observable.concat(
              Observable.of(loginFulfilled(response)),
            );
          }
        });
    })
}

const returnMobile = function (mob) {
  return mob ? ('+' + mob) : '';
}

const returnGender = function (gen) {
  let gender = '';
  if (gen === '') {
    gender = '';
  } else if (gen.toLowerCase() === 'male') {
    gender = 'M';
  } else if (gen.toLowerCase() === 'female') {
    gender = 'F';
  }
  return gender;
}


export const register = payload => ({ type: REGISTER, payload })
const registerFulfilled = function (payload) {
  if (!payload.error) {
    saveAccessCredentials(payload)
    gtmPush({
      'event': 'Registration',
      'ec': 'Registration',
      'content_info': {
        'content_name': payload.first_name ? payload.first_name : '',
        'content_email': payload.email ? payload.email : '',
        'content_phone': payload.mobile ? payload.mobile : '',
        'content_type': 'register',
        'first_name': payload.first_name ? payload.first_name : '',
        'last_name': payload.last_name ? payload.last_name : '',
        'email': payload.email ? payload.email : '',
        'gender': returnGender(payload.gender ? payload.gender : ''),
        'mobile': returnMobile(payload.mobile ? payload.mobile : ''),
        'user_id': payload.id ? payload.id : ''
      }
    });
  }
  return ({ type: REGISTER_FULFILLED, payload })
}

export const registerEpic = action$ => {
  return action$.ofType(REGISTER)
    .mergeMap(action => {
      return Api.post({ url: 'users', postObj: action.payload })
        .flatMap((response) => {
          if (!response.error) {
            return Observable.concat(
              Observable.of(registerFulfilled(response)),
            )
          } else {
            return Observable.concat(
              Observable.of(registerFulfilled(response)),
            )
          }
        })
    })
}


export const forgotPassword = payload => ({ type: FORGOT_PASSWORD, payload })
const forgotPasswordFulfilled = function (payload) {
  return ({ type: FORGOT_PASSWORD_FULFILLED, payload })
}

export const forgotPasswordEpic = action$ => {
  return action$.ofType(FORGOT_PASSWORD)
    .mergeMap(action => {
      let url = `password/new?akamaiC=ewmo&email=${action.payload.email}`
      return Api.get({ url: url }).map(response => forgotPasswordFulfilled(response))
    })
}

export const OPENAUTHMODAL = "OPENAUTHMODAL"
export const open_auth_modal = (payload) => {
  if (typeof window !== 'undefined') {
    if (window.Android && window.Android.activeWebviewPage)  window.Android.activeWebviewPage('login', '');        
  }
  return{ type: OPENAUTHMODAL, payload }
}

export const FORGOTPASSWORDMODAL = "FORGOTPASSWORDMODAL"
export const open_forgotpassword_modal = (payload) => ({ type: FORGOTPASSWORDMODAL, payload })


export const SHOWREGISTERMODAL = "SHOWREGISTERMODAL"
export const open_register_modal = (payload) => ({ type: SHOWREGISTERMODAL, payload })


export const SHOWOTPMODAL = "SHOWOTPMODAL"
export const open_otp_modal = payload => ({ type: SHOWOTPMODAL, payload })


export const RESET_EMAIL_SENT = "RESET_EMAIL_SENT"
export const reset_email_sent = payload => ({ type: RESET_EMAIL_SENT, payload })


const logout_params = { "param": "" }
export const logout = () => ({ type: LOGOUT })
const logoutFulfilled = function (payload) {
  gtmPush({
    'event': 'logout',
    'ec': 'logout'
  })
  return ({ type: LOGOUT_FULFILLED, payload })
}

export const EMPTYWISHLIST = "EMPTYWISHLIST"
export const emptyWishlist = () => ({ type: EMPTYWISHLIST })

export const logoutEpic = action$ => {
  return action$.ofType(LOGOUT)
    .mergeMap(action => {
      return Api
        .delete({ url: 'authentication', postObj: logout_params })
        .flatMap(response => {
          deleteToken();
          return Observable.concat(
            Observable.of(emptyWishlist()),
            Observable.of(logoutFulfilled(response)),
          )
        })
    })
}

export const NEW_USER_EMPTY = "NEW_USER_EMPTY"
export const newUserEmpty = (payload) => ({ type: NEW_USER_EMPTY, payload })

export const login_expired = () => ({ type: LOGOUT_FULFILLED })

export const RESET_AUTH_DETAILS = 'RESET_AUTH_DETAILS'
export const reset_auth_details = () => ({ type: RESET_AUTH_DETAILS })
