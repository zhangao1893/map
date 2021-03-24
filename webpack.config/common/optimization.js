'use strict';
/**
 * Created by weiChow on 2020/06/30
 * optimization
 */

module.exports = () => {
  return {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    // main.js中存放了其他模块的hash,所以当其他模块当hash一变，main的hash也会跟着变，从而造成缓存失效
    // 将当前模块所记录的其他模块的hash单独打包为一个文件 runtime(解决缓存失效问题)
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  };
};
