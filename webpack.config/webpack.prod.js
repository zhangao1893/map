'use strict';
/**
 * Created by weiChow on 2020/06/30
 * 生产时构建
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
// 压缩JS文件(webpack在构建时内置了该插件 如果需要对该插件进行配置 就需要安装)
const TerserPlugin = require('terser-webpack-plugin');
const env = require('./env/prod');
const globalVariable = require('./env/commonEnv');

const base = require('./webpack.base');

module.exports = merge(base(), {
  plugins: [new webpack.DefinePlugin({ ...env, ...globalVariable })],
  // 优化
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: 'config',
        cache: true,
        parallel: true, // 多进程打包 提升构建速度
        sourceMap: true
      })
    ]
  }
});
