let dispatch: any;

export const Dispatch = {
  set: function (args) {
    dispatch = args;
  },
  get: function () {
    return dispatch
  }
}