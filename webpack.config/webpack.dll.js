'use strict';
/**
 * Created by fanweihua on 2020/12/21
 * 开发时构建dll分包
 */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次构建前清理webpack配置的output目录，这样只会生成用到的文件
module.exports = {
  entry: {
    library: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'antd']
  },
  output: {
    path: path.join(__dirname, '../build/library'),
    filename: '[name]_[hash].dll.js',
    library: '_dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.join(__dirname, '../build/library/[name].dll.manifest.json')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
