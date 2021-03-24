'use strict';
/**
 * Created by fanweihua on 2021/03/15
 * plugins
 */
const units = require('../nodeServer/units');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 每次构建前清理webpack配置的output目录，这样只会生成用到的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS提取到单独的文件中 它为每个包含CSS的JS文件创建一个CSS文件 它支持CSS和SourceMap的按需加载
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩CSS文件
const CompressionPlugin = require('compression-webpack-plugin'); // 压缩资源
const DoneWebpackPlugin = require('done-webpack-plugin');
const WebpackBar = require('webpackbar');
const globalVariable = require('../env/commonEnv');
// 是否使用抽离大图片访问，n：关闭，y：开启；开启后，需要放入的路径位置（/excludeStatic/xxx.png）
const exStaticSta = JSON.parse(globalVariable.exStaticSta);
/**
 * 需要拷贝的静态资源
 */
const CopyPluginPatterns = [
  {
    from: path.join(__dirname, '../../src/static'), // static resource directory
    to: './static',
    cacheTransform: true,
    noErrorOnMissing: true // Doesn't generate an error on missing file(s).
  },
  {
    from: path.join(
      __dirname,
      `../../src/config/system.${process.env.NODE_ENV === 'local' ? 'prod' : process.env.NODE_ENV}.config.js`
    ),
    to: './config/systemConfig.js'
  }
];

module.exports = () => {
  /**
   * 基础插件模块
   */
  const modePlugins = [
    new WebpackBar(),
    new CompressionPlugin({
      filename: '[path].gz[query]', // 目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$' // 压缩 js css
      ),
      threshold: 10240, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    })
  ];
  /**
   * 开发模式
   */
  const dev = () => {
    modePlugins.push(
      new webpack.HotModuleReplacementPlugin(), // HMR 热替换模块 开发模式搭配WDS WDM使用
      new CopyPlugin({
        patterns: CopyPluginPatterns,
        options: {
          concurrency: 100 // limits the number of simultaneous requests to fs
        }
      })
    );
  };
  /**
   * 打包模式
   */
  const build = () => {
    if (exStaticSta === 'y') {
      // 抽离出来的静态文件资源
      CopyPluginPatterns.push({
        from: path.join(__dirname, '../../excludeStatic'), // static resource directory
        to: './excludeStatic'
      });
    }
    modePlugins.push(
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: CopyPluginPatterns,
        options: {
          concurrency: 100 // limits the number of simultaneous requests to fs
        }
      }),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
      }),
      // 打包完成
      new DoneWebpackPlugin(stats => {
        // 是否使用抽离大图片访问
        if (exStaticSta === 'y') {
          units.replaceSpecialString(); // 替换服务，主要是为了替换已抽离图片访问路径的字符
        }
        // dist文件夹压缩服务
        units.zipFolderServer();
      })
    );
  };
  /**
   * 插件模式
   */
  const modePluginsNode = {
    // 开发模式
    dev: () => {
      dev();
    },
    // 打包模式
    build: () => {
      build();
      modePlugins.push(
        new MiniCssExtractPlugin({
          filename: './static/css/[name]-[id].[chunkhash:8].bundle.css' // 指定打包后的css
        }) // 用来抽离css文件 不用打包到js文件里
      );
    },
    // 本地模式
    local: () => {
      build();
    }
  };
  if (process.env.NODE_ENV === 'dev') {
    modePluginsNode.dev();
  } else if (process.env.NODE_ENV === 'local') {
    modePluginsNode.local();
  } else {
    modePluginsNode.build();
  }
  return [].concat(modePlugins);
};
