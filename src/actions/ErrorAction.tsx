export const SET_404 = 'SET_404'
export const SET_500 = 'SET_500'

import { Dispatch } from '../utils'

export const set404 = (payload: boolean) => Dispatch.get()({type: SET_404, payload})
export const set500 = (payload: boolean) => Dispatch.get()({type: SET_500, payload})
