'use strict';
/**
 * Created by weiChow on 2020/07/13
 * register data flow
 */
import { composeWithDevTools } from 'redux-devtools-extension'; // devtools
import { createStore, applyMiddleware, combineReducers } from 'redux'; // Redux
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';
import { initStore } from './store'; // 创建可用于js中的store

export default function registerStore() {
  const [
    NAMESPACE_SEP, // 类型分隔符
    ROOT_NAMESPACE, // 根级命名空间
    _effects // 副作用effect
  ] = ['/', 'global', []];
  const sagaMiddleware = createSagaMiddleware();
  const app = {
    store: null,
    _models: [],
    useModel: model => {
      app._models.push(
        ...model
          .filter(m => m) // To rule out empty file
          .map(current => {
            current.nameSpace = current.nameSpace || ROOT_NAMESPACE;
            return current;
          })
      );
      return app;
    },
    registerDynamicModule,
    run
  };
  return app;

  /**
   * 启动
   */
  function run() {
    const createReducer = createReducers(); // 创建Reducers对象集合
    const store = create(createReducer); // 创建Store
    app.store = store;
    sagaMiddleware.run(createEffects()); // 启动saga
    initStore(store); // 创建可用于js中的store
    return store;
  }

  /**
   * 创建Store
   * @param appReducer
   */
  function create(appReducer) {
    return createStore(combineReducers(appReducer), composeWithDevTools(applyMiddleware(sagaMiddleware)));
  }

  function registerDynamicModule() {
    const newReducers = createReducers(); // 获取新的Reducers对象集合
    app.store.replaceReducer(combineReducers(newReducers)); // 动态合并reducer
    sagaMiddleware.run(createEffects());
  }

  /**
   * 创建Reducers对象集合
   */
  function createReducers() {
    return app._models.reduce((acc, model) => {
      if (model.reducers) {
        acc[model.nameSpace] = createReducerFunc(model);
      }
      return acc;
    }, {});
  }

  /**
   * 创建Reducer包装函数
   * @param model
   */
  function createReducerFunc(model) {
    const { nameSpace, reducers } = model;
    if (reducers) {
      const initState = model.state;
      const reducerFunMap = Object.keys(reducers).reduce((acc, reducerKey) => {
        acc[`${nameSpace}${NAMESPACE_SEP}${reducerKey}`] = reducers[reducerKey];
        return acc;
      }, {});
      return (state = initState, action) => {
        const type = action.type;
        if (reducerFunMap[type]) {
          return reducerFunMap[action.type](state, action);
        }
        return state;
      };
    }
  }

  /**
   * 创建副作用effect
   */
  function createEffects() {
    app._models.map(model => {
      const { nameSpace, effects } = model;
      if (effects) {
        _effects.push(
          ...Object.keys(effects).map(effectKey => {
            return function* () {
              try {
                while (true) {
                  const action = yield sagaEffects.take(`${nameSpace}${NAMESPACE_SEP}${effectKey}`);
                  yield* effects[effectKey](action, sagaEffects);
                }
              } catch (e) {
                console.log(e);
              }
            };
          })
        );
      }
    });
    return function* rootSaga() {
      yield sagaEffects.all(_effects.map(sagaEffects.fork));
    };
  }
}
