'use strict';
import { getListApi } from '@/container/test/reduxSaga/api';
export default {
  nameSpace: 'testReduxSaga',

  state: { data: [] },

  effects: {
    *getList(action, { put, call }) {
      const res = yield call(getListApi, action.payload);
      if (res.code === 200) {
        yield put({
          type: 'testReduxSaga/update',
          payload: res
        });
      }
    }
  },

  reducers: {
    update(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
