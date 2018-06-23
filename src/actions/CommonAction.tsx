import { Dispatch } from '../utils'
import { Api } from "../api";

export const UPDATE_COMMON = 'UPDATE_COMMON'
export const updateCommon = (payload: any) => Dispatch.get()({type: UPDATE_COMMON, payload})

export const GET_LOCATION = 'GET_LOCATION'
export const GET_LOCATION_FULFILLED = "GET_LOCATION_FULFILLED";

export const getLocation = () => ({ type: GET_LOCATION });
const getLocationFulfilled = (payload) => {
  return ({ type: GET_LOCATION_FULFILLED, payload });
};


export const getLocationEpic = action$ => {
  return action$.ofType(GET_LOCATION)
    .mergeMap(action => {
      return Api.get({ url: `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA-Pk4VhIVTN9LXzDVHAwO0OfbMXno6OSE`}).map(response => getLocationFulfilled(response));
    });
};