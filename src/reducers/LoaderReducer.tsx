import { SHOW_LOADER, HIDE_LOADER } from '../actions/LoaderAction'

let initialState = {
  title:'Please wait..',
  activeLoaders:0
}

export const LoaderReducer = (state = initialState, action) => {

  let newState;
  switch(action.type){
    case SHOW_LOADER:
    //console.log(action,11111);
    newState = {
      ...initialState,
      title:action.payload.title || initialState.title,
      activeLoaders:state.activeLoaders + 1
    }
    return newState;  

    case HIDE_LOADER:
    newState = {
      ...initialState,
      activeLoaders:(state.activeLoaders - 1 < 0) ? 0:(state.activeLoaders - 1)
    }
    return newState;    

    default:
        return state;
  }
}
