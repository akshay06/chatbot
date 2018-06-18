import { combineReducers } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { routerReducer } from 'react-router-redux'
import { LoaderReducer } from './reducers/LoaderReducer'
import { CheckoutReducer } from './reducers/CheckoutReducer'
import { ToastReducer } from './reducers/ToastReducer'
import { ErrorReducer } from './reducers/ErrorReducer'
import { FooterReducer } from './reducers/FooterReducer'
import { CommonReducer } from './reducers/CommonReducer'
import { HeaderReducer } from './reducers/HeaderReducer'
import { AuthReducer } from './reducers/AuthReducer'
// import { fetchFBInstaCountEpic, subscribeUserEpic } from './actions/FooterAction'
import { fetchUrlTypeEpic } from './actions/RoutePageTypeAction'
import { loginEpic } from './actions/AuthAction'

export const rootEpic = combineEpics(
  // fetchFBInstaCountEpic,
  loginEpic,
  fetchUrlTypeEpic,
  // subscribeUserEpic,
)

export const rootReducer = combineReducers({
  auth: AuthReducer,
  checkoutReducer: CheckoutReducer,
  router: routerReducer,
  loader:LoaderReducer,
  toast:ToastReducer,
  footer:FooterReducer,
  header:HeaderReducer,
  error:ErrorReducer,
  common:CommonReducer
})

export const epicMiddleware = createEpicMiddleware(rootEpic)
