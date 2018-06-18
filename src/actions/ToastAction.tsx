export const SHOW_TOAST = "SHOW_TOAST"
export const HIDE_TOAST = "HIDE_TOAST"
import { Dispatch } from '../utils'

export type ToastObject = {
  duration?: number,
  type?: 'danger' | 'success' | 'warning' | 'default',
  title: string,
  visible?: boolean
}
export
  const commonAction = (type, payload?) => {
    return {
      type: type,
      payload: payload
    }
  }

export
  const showToast = (title, type?, duration?) => {
    Dispatch.get()(commonAction(SHOW_TOAST, { title, duration }));
  }

export
  const hideToast = () => {
    Dispatch.get()(commonAction(HIDE_TOAST));
  }
