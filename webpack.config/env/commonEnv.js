'use strict';
/**
 * Created by weiChow on 2020/06/30
 * 公共配置
 */
const globalVariable = {
  publicPath: JSON.stringify('/myApp/'), // 配置多级目录访问地址
  jwtToken: JSON.stringify(''), // 开发模块下的token传递，模拟登录用到的变量
  exStaticSta: JSON.stringify('n') // 是否使用抽离大图片访问，n：关闭，y：开启；开启后，需要放入的路径位置（/excludeStatic/xxx.png）
};
module.exports = globalVariable;
