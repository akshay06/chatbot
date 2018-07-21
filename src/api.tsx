import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { Observable } from 'rxjs/Observable'

type getParams = {
  url: string,
  headers?: any,
}

type postParams = {
  url: string,
  postObj?: any,
  headers?: any
}

export const Api = {
  get: (params: getParams) => {
    let url = params.url;
    return ajax({url: url, crossDomain:true, method:'get'})
      .map(response => handleResponse(response)).catch(error => handleError(error))
  },
  post: (params: postParams) => {
    let headers = {
      'content-type': 'application/json',
      'X-Api-Key' : 'M1xJND6ZSH8Hp75Q1WWS07zhyxxIUKYX2RN1UlzG'
    }
    return ajax({
      url: params.url,
      headers,
      method:'post',
      body: JSON.stringify(params.postObj),
      crossDomain: true,
    })
    .map(response => handleResponse(response)).catch(error => handleError(error))
  },  
}

const handleResponse = (response) => {
  if(response.response == null && response.status == 204) {
    throw response;  
  }
  return response.response
}

const handleError = (error) => {
  let tempError = {};
  return Observable.of({
    // type: SHOW_GLOBAL_ERROR,
    error: true
  })
}
