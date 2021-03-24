'use strict';
/**
 * Created by weiChow on 2020/07/13
 * global model
 */

export default {
  nameSpace: 'global',

  state: {
    systemReady: '测试'
  },

  effects: {
    *setSystemReady(action, { put, call }) {
      yield call(
        () =>
          new Promise(resolve => {
            window.setTimeout(() => {
              resolve('1234');
            }, 3000);
          })
      );
      yield put({
        type: 'global/save',
        payload: {
          systemReady: '测试一下'
        }
      });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    save1(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
