'use strict';
/**
 * Created by fanweihua on 2020/12/22
 * webpack基础配置
 */
const path = require('path');
const rules = require('./common/Rules');
const optimization = require('./common/optimization');
const plugins = require('./common/plugins');
const webpack = require('webpack');

// 简化了HTML文件的创建，以便为你的webpack包提供服务
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseEntry = path.resolve(__dirname, '../src/main.js');
const globalVariable = require('./env/commonEnv');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
/**
 * 判断Dll优化策略存在
 */
const fs = require('fs');
let dllArr;
try {
  const mainfestPath = path.resolve(__dirname, '../build/library/library.dll.manifest.json');
  fs.accessSync(mainfestPath);
  dllArr = [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../dist'),
      manifest: mainfestPath
    }),
    /**
     * 自动导入加载dll文件
     */
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../build/library/*.js')
    })
  ];
} catch (err) {
  dllArr = [];
}
module.exports = () => {
  return {
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production', // 配置webpack构建模式(development production)
    entry:
      process.env.NODE_ENV === 'dev'
        ? [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000',
            baseEntry
          ]
        : baseEntry, // 入口
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: './static/js/[name]_[hash:16].js',
      chunkFilename: './static/js/chunk/chunk-[name]-[id].[chunkhash:8].bundle.js',
      publicPath: process.env.NODE_ENV === 'local' ? './' : JSON.parse(globalVariable.publicPath)
    }, // 输出构建
    // module 关于模块配置
    module: {
      rules: rules() // rules 模块规则（配置 loader、解析器等选项）
    },
    plugins: plugins().concat([
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        filename: 'index.html',
        chunks: ['main', 'vendor', 'commons'],
        inject: true,
        minify: false,
        chunksSortMode: 'none' // 如果使用webpack4将该配置项设置为'none'
      }),
      ...dllArr
    ]),
    // splitChunks分片
    optimization: optimization(),
    // 解析
    resolve: {
      extensions: ['.wasm', '.mjs', '.ts', '.tsx', '.js', '.json'], // 自动解析确定的扩展
      mainFiles: ['index', 'module'],
      alias: {
        '@': path.join(__dirname, '..', 'src'), // @映射到src目录
        'react-dom': '@hot-loader/react-dom', // 该包支持对React hook热更新
        static: path.join(__dirname, '..', '/src/static') // 指向静态资源目录
      }
    },
    stats: 'errors-only'
  };
};
