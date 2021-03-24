'use strict';
/**
 * Created by weiChow on 2020/06/30
 * 开发时构建
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const env = require('./env/dev');
const globalVariable = require('./env/commonEnv');
module.exports = merge(base(), {
  plugins: [new webpack.DefinePlugin({ ...env, ...globalVariable })],
  // 开发环境服务器(WDS) 如果使用了webpack-dev-middleware 则webpack不会读取该项配置
  devtool: 'eval-source-map'
});
