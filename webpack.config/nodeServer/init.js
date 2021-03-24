/**
 * 初始化node服务
 */
const resServer = require('./resServer'); // node资源服务集合
const express = require('express');
const multipart = require('connect-multiparty');
const Mock = require('mockjs');
const multipartMiddleware = multipart();
const app = express();
/**
 * 设置可以跨域请求
 */
app.all('*', (req, res, next) => {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Requested-With,token,userid,username');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  if (req.method.toLowerCase() === 'options') {
    res.json({
      state: true,
      data: '',
      msg: '请求成功'
    });
    return;
  }
  next();
});
/**
 * node资源服务集合
 */
resServer.staticServer.forEach(controller => {
  app.get(controller.url, controller.server);
});
/**
 * mock服务
 */
resServer.mockServer(servers => {
  // 监听mock服务
  const listenType = {
    get: server => {
      app.get(server.url, (req, res) => {
        res.status(200);
        const data = Mock.mock({
          ...server.result
        });
        res.json({
          state: true,
          data: data,
          msg: '查询成功'
        });
      });
    },
    post: server => {
      app.post(server.url, multipartMiddleware, (req, res) => {
        res.status(200);
        const data = Mock.mock({
          ...server.result
        });
        res.json({
          state: true,
          data: data,
          msg: '查询成功'
        });
      });
    },
    put: server => {
      app.put(server.url, multipartMiddleware, () => {});
    },
    delete: server => {
      app.delete(server.url, multipartMiddleware, () => {});
    }
  };
  servers.forEach(server => {
    if (listenType[server.type] && listenType[server.type] instanceof Function && server.url && server.result) {
      listenType[server.type](server);
    }
  });
});
module.exports = app;
