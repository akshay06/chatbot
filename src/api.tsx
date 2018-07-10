import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { getFromCookie, getAccessToken } from './utils'
import { Observable } from 'rxjs/Observable'
import { getQueryParams, deleteToken, Dispatch } from './utils';
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

export const Api = {
  get: (params: getParams) => {
    var getObject;
    var url;
    getObject = {
      method: 'GET',
      responseType: params.responseType || 'json',
      
    }

    url = params.url;

    return ajax({url: url, crossDomain:true, method:'get'})
      .map(response => handleResponse(response)).catch(error => handleError(error))
  },
  post: (params: postParams) => {
    let headers = {
      // ...params.headers,
      // 'Access-Control-Request-Headers': 1
      // 'X-Http-Method-Override': 'GET',
      'content-type': 'application/json'
    }
    return ajax({url: params.url, body: JSON.stringify(params.postObj), crossDomain:true, method:'post', headers})
    .map(response => handleResponse(response)).catch(error => handleError(error))
  },
  patch: (params: patchParams) => {
    var postObject = {
      method: 'POST',
      headers: {
        ...params.headers,
        'X-Http-Method-Override': 'PATCH',
      },
      postObj: params.postObj
    }
    if (getAccessToken()) {
      postObject.headers['Access-Token'] = getAccessToken()
    }
    return ajax.post(apiUrl + `${params.url}`, params.postObj, postObject.headers)
      .map(response => handleResponse(response)).catch(error => handleError(error))
  },
  delete: (params: deleteParams) => {
    var postObject = {
      method: 'POST',
      headers: {
        ...params.headers,
        'X-Http-Method-Override': 'DELETE',
      },
      postObj: params.postObj
    }
    if (getAccessToken()) {
      postObject.headers['Access-Token'] = getAccessToken()
    }
    return ajax.post(apiUrl + `${params.url}`, params.postObj, postObject.headers)
      .map(response => handleResponse(response)).catch(error => handleError(error))
  }

}

const handleResponse = (response) => {
  console.log('called', response);
  if(response.response == null && response.status == 204) {
    throw response;  
  }
  return response.response
}

const handleError = (error) => {
  let tempError = {};
  
  if(error.status == 401){
    deleteToken();
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
