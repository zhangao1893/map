'use strict';
/**
 * Created by weiChow on 2020/06/30
 * prod 环境变量
 */
module.exports = {
  environment: JSON.stringify('prod'), // 打包模式
  httpUrl: JSON.stringify('/') // 打包模式下的请求地址（ip+端口）
};
