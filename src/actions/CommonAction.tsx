import { Dispatch } from '../utils'
import { Api } from "../api";

export const UPDATE_COMMON = 'UPDATE_COMMON'
export const updateCommon = (payload: any) => Dispatch.get()({type: UPDATE_COMMON, payload})

export const GET_LOCATION = 'GET_LOCATION'
export const GET_LOCATION_FULFILLED = "GET_LOCATION_FULFILLED";

export const getLocation = (payload) => ({ type: GET_LOCATION, payload });
const getLocationFulfilled = (payload) => {
  return ({ type: GET_LOCATION_FULFILLED, payload });
};


export const getLocationEpic = action$ => {
  return action$.ofType(GET_LOCATION)
    .mergeMap(action => {
      const {latitude: lat, longitude: long} = action.payload
      return Api.get({ url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyC_f0S0qtsBdoX7cd30LTyUYeVT3lVRABA`}).map(response => getLocationFulfilled(response));
    });
};