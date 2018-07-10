import { combineReducers } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { routerReducer } from 'react-router-redux'

import { CommonReducer } from './reducers/CommonReducer'
import { getLocationEpic, submitFormEpic } from './actions/CommonAction';
// import { fetchFBInstaCountEpic, subscribeUserEpic } from './actions/FooterAction'

export const rootEpic = combineEpics(
  getLocationEpic,
  submitFormEpic
  // fetchFBInstaCountEpic,
  // subscribeUserEpic,
)

export const rootReducer = combineReducers({
  router: routerReducer,
  common: CommonReducer
})

export const epicMiddleware = createEpicMiddleware(rootEpic)
