'use strict';
/**
 * Created by weiChow on 2020/06/30
 * React、ReactDOM、RootRouter、Redux
 */
import React from 'react';
import ReactDOM from 'react-dom';
import RootRouter from '@/router/index'; // 路由入口
import { Provider } from 'react-redux';
import 'animate.css'; // 动画效果
import './main.less'; // 主框架样式
import { ConfigProvider } from 'antd';
import { title } from './config/systemConfig'; // 系统内部配置文件
import zhCN from 'antd/es/locale/zh_CN'; // 国际化(中文)
import registerStore from '@/common/store/registerStore';
import 'antd/dist/antd.css';
if (module.hot) {
  module.hot.accept();
}
if (title) {
  document.title = title;
}

// 创建store
const context = require.context('@/model', true, /\.js$/);
const storeRegister = registerStore();
const store = storeRegister.useModel(context.keys().map(key => context(key).default)).run();

const rootContainer = (
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <RootRouter />
    </ConfigProvider>
  </Provider>
);

ReactDOM.render(rootContainer, document.getElementById('root'));
