export const UPDATE_COMMON = 'UPDATE_COMMON'

import { Dispatch } from '../utils'

export const updateCommon = (payload: any) => Dispatch.get()({type: UPDATE_COMMON, payload})
