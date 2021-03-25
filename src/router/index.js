'use strict';
/**
 * Created by weiChow on 2020//06/30.
 * 路由入口
 * export default RootRouter;
 */

import React from 'react';
import { Switch } from 'react-router';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import asyncComponent from '@/common/tool/asyncComponent'; // 异步加载
import router from './router'; // 路由

// 首页路由
const indexRoute = {
  name: '首页',
  path: '/',
  exact: true,
  component: asyncComponent(() => import('@/container/index'))
};
const routes = [indexRoute, ...router]; // 路由合并
const RouterComponent = () => <Switch>{renderRoutes(routes)}</Switch>;
const RootRouter = () =>
  environment === 'local' ? (
    <HashRouter>
      <RouterComponent />
    </HashRouter>
  ) : (
    <BrowserRouter basename={publicPath || '/'}>
      <RouterComponent />
    </BrowserRouter>
  );

export default RootRouter;
