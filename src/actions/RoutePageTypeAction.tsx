import { Api } from '../api'
import 'rxjs/add/observable/concat'
import { Observable } from 'rxjs/Observable'
import { getAccessToken, Dispatch } from './../utils'

export const FETCH_URL_TYPE = 'FETCH_URL_TYPE'
export const FETCH_URL_TYPE_FULFILLED = 'FETCH_URL_TYPE_FULFILLED'

export const fetchUrlType = (payload) => ({ type: FETCH_URL_TYPE, payload })
const fetchUrlTypeFulfilled = payload => ({ type: FETCH_URL_TYPE_FULFILLED, payload })

export const fetchUrlTypeEpic = action$ => {
  return action$.ofType(FETCH_URL_TYPE)
    .mergeMap(action => {
      return Api.get({ url: `statics`, query: action.payload, ignoreLoader:true }).map(response => 
        fetchUrlTypeFulfilled(response)        
      )
    })
}
