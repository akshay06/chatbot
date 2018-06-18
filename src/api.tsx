import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { getFromCookie, getAccessToken } from './utils'
import { Observable } from 'rxjs/Observable'
import { getQueryParams, deleteToken, Dispatch } from './utils';
import { set404, set500 } from './actions/ErrorAction';
import { showToast } from './actions/ToastAction';
import { showLoader, hideLoader } from './actions/LoaderAction';
import { gtmPush } from './lib/pixels';
import { apiUrl } from './lib/constants';

declare let process: any
declare let BROWSER: any

const date_time = new Date()
export const dt = date_time.getDate() + ':' + date_time.getMonth() + ':' + date_time.getFullYear() + ':' + date_time.getHours();

export let API_TOKEN

if (BROWSER && (/android|webos|iphone|ipad|ipod|blackberry|windows phone|iemobile|BB10|playbook|opera mini|ucbrowser|wpdesktop/i.test(navigator.userAgent.toLowerCase()))) {
  API_TOKEN = 'NGNlNTUwYTc0MjBjYzQzZTdiZTNhMmY1NjNhMThhOGU6OGI1NThkZDgtOGQ5ZS00OWYxLTk4MDAtNzYxMGEzOGNjYzNk'
} else {
  API_TOKEN = 'MWY5ZTNmNzFmN2M1ZTUyMjkwNjM2NGMzNmNjZTA3N2Q6M2RhMmI3OTgtNTY2MC00ZDRhLWJhZWQtNTZlMDI2MWRlYmZm'
}

type getParams = {
  url: string,
  headers?: any,
  query?: any,
  ignoreLoader?:boolean,
  responseType?:string
}

type postParams = {
  url: string,
  postObj?: any,
  headers?: any
}

type patchParams = {
  url: string,
  postObj?: any,
  headers?: any
}

type deleteParams = {
  url: string,
  postObj?: any,
  headers?: any
}

const headerParams = {
  'API-TOKEN': API_TOKEN,
  'token': getFromCookie('token'),
  'Content-Type': 'application/json',
}

export const Api = {
  get: (params: getParams) => {
    var getObject;
    var url;
    getObject = {
      method: 'GET',
      responseType:params.responseType || 'json',
      headers: {
        ...params.headers,
        'X-Http-Method-Override': 'GET',
        ...headerParams
      },
    }
    if (getAccessToken()) {
      getObject.headers['Access-Token'] = getAccessToken()
    }

    if(!params.ignoreLoader) showLoader('Loading.......');

    if (params.query) {
      getObject.query = getQueryParams(params.query)
      url = `${params.url}?${getObject.query}&dt=${dt}`
    } else {
      url = params.url && params.url.indexOf("?") > -1 ? `${params.url}&dt=${dt}` : `${params.url}?dt=${dt}`
    }

    return ajax({url:apiUrl + `${url}`, headers:getObject.headers, method:'get', responseType:getObject.responseType})
      .map(response => handleResponse(response)).catch(error => handleError(error))
  },
  post: (params: postParams) => {
    var postObject = {
      method: 'POST',
      headers: {
        ...params.headers,
        'X-Http-Method-Override': 'POST',
        ...headerParams
      },
      postObj: params.postObj
    }
    if (getAccessToken()) {
      postObject.headers['Access-Token'] = getAccessToken()
    }
    showLoader('Loading.......');
    return ajax.post(apiUrl + `${params.url}`, params.postObj, postObject.headers)
      .map(response => handleResponse(response)).catch(error => handleError(error))
  },
  patch: (params: patchParams) => {
    var postObject = {
      method: 'POST',
      headers: {
        ...params.headers,
        'X-Http-Method-Override': 'PATCH',
        ...headerParams
      },
      postObj: params.postObj
    }
    if (getAccessToken()) {
      postObject.headers['Access-Token'] = getAccessToken()
    }
    showLoader('Loading.......');
    return ajax.post(apiUrl + `${params.url}`, params.postObj, postObject.headers)
      .map(response => handleResponse(response)).catch(error => handleError(error))
  },
  delete: (params: deleteParams) => {
    var postObject = {
      method: 'POST',
      headers: {
        ...params.headers,
        'X-Http-Method-Override': 'DELETE',
        ...headerParams
      },
      postObj: params.postObj
    }
    if (getAccessToken()) {
      postObject.headers['Access-Token'] = getAccessToken()
    }
    showLoader('Loading.......');
    return ajax.post(apiUrl + `${params.url}`, params.postObj, postObject.headers)
      .map(response => handleResponse(response)).catch(error => handleError(error))
  }

}

const handleResponse = (response) => {
  if(response.response == null && response.status == 204) {
    throw response;  
  }
  hideLoader();
  if(response.response && response.response.clevertap_object && response.response.clevertap_object.ec == 'OrderInfo' ){ 
    // Checkout Initiated Event fired when Charged clevertap object is coming from backend
    // Charged event will be fired on the success page
    if(typeof localStorage === 'object' && localStorage.clevertap_object && response.response.clevertap_object.pixel_data.order_event_name == 'Charged'){
      try {
        gtmPush(localStorage.clevertap_object);          
      } catch (e) {
        console.error('error', e)
      }
    }
    if(typeof localStorage === 'object') {
      try {
        localStorage.clevertap_object = JSON.stringify(response.response.clevertap_object);
      } catch (e) {
        console.error('error', e)
      }
    }
  }
  else if(response.response && response.response.clevertap_object){
    gtmPush(response.response.clevertap_object);
    if(typeof localStorage === 'object') {
      try {
        localStorage.clevertap_object = undefined;
      } catch (e) {
        console.error('error', e)
      }
    }
  }
  if(response.response && response.response.error && response.response.error.code == 35 ) {
    set404(true);
  }
  return response.response
}

const handleError = (error) => {
  let tempError = {};
  hideLoader();
  if(error.status == 401){
    deleteToken();
  }

  if(error.status==500){
    showToast('Something is not right!');
  }

  if(error.status == 204){
    tempError = {
      code: 204,
      message: 'Product Already Removed',
      type: error
    }
  }
  return Observable.of({
    // type: SHOW_GLOBAL_ERROR,
    payload: error.xhr && error.xhr.response? error.xhr.response : tempError,
    error: true
  })
}
