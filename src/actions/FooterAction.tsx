import { Api } from '../api'
import 'rxjs/add/observable/concat'
import { Observable } from 'rxjs/Observable'
import { getAccessToken, Dispatch } from './../utils'

export const FETCH_FB_INSTA_COUNT = 'FETCH_FB_INSTA_COUNT'
export const FETCH_FB_INSTA_COUNT_FULFILLED = 'FETCH_FB_INSTA_COUNT_FULFILLED'

export const fetchFBInstaCount = (payload) => ({ type: FETCH_FB_INSTA_COUNT, payload })
const fetchFBInstaCountFulfilled = payload => ({ type: FETCH_FB_INSTA_COUNT_FULFILLED, payload })

export const fetchFBInstaCountEpic = action$ => {
  return action$.ofType(FETCH_FB_INSTA_COUNT)
    .mergeMap(action => {
      return Api.get({ url: `statics`, query: action.payload, ignoreLoader:true }).map(response => 
        fetchFBInstaCountFulfilled(response)        
      )
    })
}

export const SUBSCRIBE_USER = 'SUBSCRIBE_USER'
export const SUBSCRIBE_USER_FULFILLED = 'SUBSCRIBE_USER_FULFILLED'

export const subscribeUser = (payload) => ({ type: SUBSCRIBE_USER, payload })
const subscribeUserFulfilled = payload => ({ type: SUBSCRIBE_USER_FULFILLED, payload })

export const subscribeUserEpic = action$ => {
  return action$.ofType(SUBSCRIBE_USER)
    .mergeMap(action => {
      return Api.post({ url: `leads`,postObj: action.payload }).map(response => 
        subscribeUserFulfilled(response)        
      )
    })
}
export const SET_FOOTER_LOCAL = 'SET_FOOTER_LOCAL'

export const setLocal = (payload) => {
  Dispatch.get()({
    type: SET_FOOTER_LOCAL,
    payload
  })
}

// "lead":{"email":"assa@as"}