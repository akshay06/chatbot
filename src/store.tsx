import {rootEpic, rootReducer, epicMiddleware} from './root'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import * as React from 'react';
import history from './history'

declare let require: any
declare let process: any
declare let window: any
// Build the middleware for intercepting and dispatching navigation actions
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [routerMiddleware(history), epicMiddleware]

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

if (process.env.NODE_ENV === 'development'){
  // const { logger } = require('redux-logger')
  // middleware.push(logger)
  // const { whyDidYouUpdate } = require('why-did-you-update')
  // whyDidYouUpdate(React)
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  rootReducer,
  preloadedState,
  process.env.NODE_ENV === 'development' ? composeEnhancers(applyMiddleware(...middleware)) : applyMiddleware(...middleware),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store

//  HMR for reducers
// https://github.com/reactjs/react-redux/releases/tag/v2.0.0
