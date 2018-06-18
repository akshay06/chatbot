export const SHOW_LOADER = "SHOW_LOADER"
export const HIDE_LOADER = "HIDE_LOADER"

import {Dispatch} from '../utils';

export type LoaderPayload = {
    title?: string,
}

export const showLoader = (title?: string) => {
    Dispatch.get()({ type: SHOW_LOADER, payload: { title } });
}

export const hideLoader = () => {
    Dispatch.get()({ type: HIDE_LOADER });
}
