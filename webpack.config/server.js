/**
 * webpack的node服务启动
 */
const app = require('./nodeServer/init'); // 初始化node服务
const path = require('path');
const os = require('os');
const open = require('open');
const express = require('express');
const webpack = require('webpack');
const request = require('request');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const portfinder = require('portfinder');
const globalVariable = require('./env/commonEnv'); // 获取公共配置
const devVariable = require('./env/dev'); // 获取开发环境配置

/**
 * 执行开发模式服务
 */
const enforceService = () => {
  const config = require('./webpack.dev.js');
  const compiler = webpack(config);
  const publicPathName = JSON.parse(globalVariable.publicPath);

  /**
   * 获取本机IP
   */
  function getIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }

  /**
   * 开发热更新中间件
   */
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: publicPathName,
    quiet: true,
    noInfo: true,
    // 统计信息
    // stats: {
    //   colors: true,
    //   chunks: false
    // }
    stats: 'errors-only' // 不显示控制台打包信息
  });
  /**
   * 热更新
   */
  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: console.log,
    heartbeat: 2000
  });
  const staticPath = path.posix.join('/', 'static');
  app.use(staticPath, express.static('./static'));
  app.use(hotMiddleware);
  app.use(devMiddleware);
  app.get('*', (req, res, next) => {
    const filename = path.join(__dirname, '../dist', 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
  /**
   * 设置有效端口并且监听服务
   */
  const setPortListen = async () => {
    portfinder.basePort = 8000;
    const port = await portfinder
      .getPortPromise()
      .then(port => {
        return port;
      })
      .catch(err => {
        console.log(err);
        return 8081;
      });
    app.listen(port, function () {
      // 获取ip地址
      const ipAddress = getIPAddress();
      const address = [`http://localhost:${port}${publicPathName}`];
      console.log('app listening on the following address:');
      console.log('\x1b[96m', `${address[0]}`);
      if (ipAddress) {
        address.push(`http://${ipAddress}:${port}${publicPathName}`);
        console.log('\x1b[95m', `${address[1]}`);
      }
      console.log('\x1bPlease wait while building . . .');
      open(address[address.length - 1], { wait: true });
    });
  };
  setPortListen(); // 设置有效端口并且监听服务
};
/**
 * 模拟登录
 */
const mockLogin = () => {
  console.log(
    '模拟登录地址',
    `${JSON.parse(devVariable.httpUrl)}founder-identify/v0.1/user/login/dev?userId=${
      devVariable.simulationUserId
    }&pwd=${devVariable.simulationPwd}`
  );
  // 请求地址
  const url = `${JSON.parse(devVariable.httpUrl)}founder-identify/v0.1/user/login/dev?userId=${
    devVariable.simulationUserId
  }&pwd=${devVariable.simulationPwd}`;
  // 请求
  request(
    {
      url: url,
      timeout: 4000
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const bodyData = JSON.parse(body);
        if (bodyData.code === '200' && bodyData.data && bodyData.data) {
          globalVariable.jwtToken = JSON.stringify(bodyData.data);
          console.log('\x1B[32m', '模拟登录成功');
        } else {
          console.log('\x1B[31m', '模拟登录失败');
        }
      } else {
        console.log('\x1B[31m', '模拟登录失败');
      }
      enforceService(); // 执行开发模式服务
    }
  );
};
mockLogin(); // 模拟登录
