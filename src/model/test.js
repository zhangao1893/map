'use strict';
export default {
  nameSpace: 'myTest',

  state: {
    count: 0
  },

  reducers: {
    getCount(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
