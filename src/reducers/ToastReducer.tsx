import { SHOW_TOAST, HIDE_TOAST, ToastObject } from '../actions/ToastAction'

let initialState:ToastObject = {
  duration:2000,
  type:'default',
  title:'',
  visible:false
}

export const ToastReducer = (state = initialState, action) => {

  let newState;
  switch(action.type){
    case SHOW_TOAST:
    newState = {
      ...initialState,
      duration:action.payload.duration || initialState.duration,
      type:action.payload.type || initialState.type,
      title:action.payload.title,
      visible:true
    }
    return newState;  

    case HIDE_TOAST:
    newState = {
      ...initialState,
      visible:false
    }
    return newState;    

    default:
        return state;
  }
}
