'use strict';
/**
 * Created by weiChow on 2020/06/30
 * http
 */
import axios from 'axios';
import { dealError } from './abnormal'; // 异常处理
if (environment === 'dev' && jwtToken) {
  if (jwtToken) {
    Object.keys(jwtToken).map(item => {
      axios.defaults.headers.common[item] = jwtToken[item];
    });
  }
}
const axiosHttp = axios.create({
  timeout: 6000
});

// request 拦截器
axiosHttp.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error);
  }
);

// response 拦截器(响应拦截器即异常处理)
axiosHttp.interceptors.response.use(
  response => response,
  error => {
    if (error?.response) {
      dealError(error); // 错误处理
    }
    return Promise.reject(error.response);
  }
);
/**
 * get
 * @param url
 * @param option
 * @returns {Promise<any>|{cancel: *, promise: Promise<any>}}
 */
const get = (url, option) => {
  const promise = new Promise((resolve, reject) => {
    axiosHttp.get(url, option).then(
      response => {
        resolve(response.data);
      },
      err => {
        if (err) {
          console.error('err', err);
          reject(err);
        }
      }
    );
  });
  if (option.isCancel) {
    return { promise: promise, cancel: option.cancel };
  }
  return promise;
};
/**
 * 数据操作类型（post、put、delete、patch）
 * @param url
 * @param options
 * @returns {Promise<any>|{cancel: *, promise: Promise<any>}}
 */
const optionMethod = (url, options) => {
  let httpType = 'post'; // 请求类型
  switch (options.method) {
    case 'post':
    case 'POST':
      httpType = 'post';
      break;
    case 'patch':
    case 'PATCH':
      httpType = 'patch';
      break;
    case 'put':
    case 'PUT':
      httpType = 'put';
      break;
    case 'DELETE':
    case 'delete':
      httpType = 'delete';
      break;
  }
  const body = setOptionMethodBody(options); // 转换body数据格式和类型
  const promise = new Promise((resolve, reject) => {
    axios({
      method: httpType,
      url: url,
      data: body
    }).then(
      response => {
        resolve(response.data);
      },
      err => {
        if (err) {
          console.error('err', err);
          reject(err);
        }
      }
    );
  });
  if (options.isCancel) {
    return { promise: promise, cancel: options.cancel };
  }
  return promise;
};
/**
 * 转换body数据格式和类型
 */
const setOptionMethodBody = options => {
  const { data } = options;
  if (options.type === 'form') {
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      if (Object.prototype.toString.call(data[key]) === '[object Array]') {
        data[key].map(item => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, data[key]);
      }
    }
    return formData;
  } else if (options.type === 'json') {
    return JSON.stringify(data);
  } else {
    return data;
  }
};
/**
 * 取消请求源
 */
export const cancelSource = () => {
  const { token, cancel } = axios.CancelToken.source();
  return { token, cancel };
};
/**
 * 请求
 */
export const http = (url, options) => {
  const { token, cancel } = cancelSource();
  options.cancelToken = token;
  options.cancel = cancel;
  if (options.method === 'get' || options.method === 'GET') {
    return get(url, Object.assign({}, { params: options.data || {} }, options));
  } else {
    return optionMethod(url, options); // 数据操作类型（post、put、delete、patch）
  }
};
