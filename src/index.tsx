import * as React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import { App } from './containers/App/App'
import { getFromCookie, setCookie, parsedQueryParams } from './utils';
import store from './store'

declare let module: { hot: any }
declare let require: any
declare let process: any

let qParams = parsedQueryParams();

const access_token =  qParams.token || getFromCookie('Access-Token');
const deviceType = qParams.device || getFromCookie('deviceType');

let commonState:any = {
  isAndroid:(/android/i.test(navigator.userAgent.toLowerCase())),
  isIos:(/ios/i.test(navigator.userAgent.toLowerCase()))
}
if (deviceType) {
  setCookie('deviceType', deviceType)
  commonState.deviceType = deviceType;
}

if (access_token) {
  setCookie('Access-Token', access_token);
}

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app') as HTMLElement
)


if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./containers/App/App', () => {
    const PostcardApp = require('./containers/App/App').App
    render(
      <PostcardApp />,
      document.getElementById('app')
    )
  })
}

//const serviceworker_path = process.env.NODE_ENV === 'production' ? './service-worker.js' : '../service-worker.js'

// if('serviceWorker' in navigator){
//   navigator.serviceWorker
//     .register(serviceworker_path)
//     .then(function() { console.log('Service Worker Registered') },
//           function(error){ console.log('Error in Service Worker Registration') })
// }