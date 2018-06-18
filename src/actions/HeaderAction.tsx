export const SET_LOCAL_HEADER = 'SET_LOCAL_HEADER'

import { Dispatch } from '../utils'

export const setLocalHeader = (payload) => {
    Dispatch.get()({
        type: SET_LOCAL_HEADER,
        payload
    })
}
