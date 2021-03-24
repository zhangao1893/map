'use strict';
/**
 * Created by fanweihua on 2020/08/07
 * http
 */
import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

/**
 * 错误处理
 * @param error
 */
export const dealError = error => {
  switch (error.response.status) {
    case 400:
      console.log('错误请求');
      break;
    case 401:
      if (environment === 'prod') {
        Modal.confirm({
          title: '警告',
          icon: <ExclamationCircleOutlined />,
          content: '登录过期，是否重新登录？',
          okText: '确认',
          onOk: () => {
            window.location.href = `/FIdentify-web?url=${window.location.href}`;
          },
          cancelText: '取消'
        });
      }
      break;
    case 403:
      console.log('拒绝访问');
      break;
    case 404:
      console.log('请求错误,未找到该资源');
      break;
    case 405:
      console.log('请求方法未允许');
      break;
    case 408:
      console.log('请求超时');
      break;
    case 500:
      console.log('服务器端出错');
      break;
    case 501:
      console.log('网络未实现');
      break;
    case 502:
      console.log('网络错误');
      break;
    case 503:
      console.log('服务不可用');
      break;
    case 504:
      console.log('网络超时');
      break;
    case 505:
      console.log('http版本不支持该请求');
      break;
    default:
      console.log(`连接错误${error.response.status}`);
  }
};
