/**
 * Created by FanWeiHua on 2020/8/27.
 * 本地数据存储
 * export Storage
 */
import { Base64 } from 'js-base64';

/**
 * 获取LocalStorage信息
 */
export const getLocalStorage = key => {
  const keyInfo = Base64.encodeURI(key);
  const userInfo = localStorage.getItem(keyInfo);
  if (userInfo) {
    const use = Base64.decode(userInfo);
    return JSON.parse(use);
  } else {
    return '';
  }
};
/**
 * 获取所有LocalStorage信息
 */
export const getAllLocalStorage = () => {
  return localStorage;
};
/**
 * 删除所有的本地存储(LocalStorage)
 */
export const deleteAllLocalStorage = () => {
  if (localStorage) {
    Object.keys(localStorage).map(item => {
      delete localStorage[item];
    });
  }
};
/**
 * 存储LocalStorage信息
 */
export const setLocalStorage = (key, value) => {
  const keyInfo = Base64.encodeURI(key);
  const userInfo = Base64.encodeURI(JSON.stringify(value));
  localStorage.setItem(keyInfo, userInfo);
};
/**
 * 删除LocalStorage信息
 */
export const deleteLocalStorage = key => {
  const keyInfo = Base64.encodeURI(key);
  delete localStorage[keyInfo];
};
/**
 * 获取SessionStorage信息
 */
export const getSessionStorage = key => {
  return sessionStorage.getItem(key);
};
/**
 * 存储SessionStorage信息
 */
export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};
/**
 * 删除SessionStorage信息
 * @param key
 */
export const deleteSessionStorage = key => {
  delete sessionStorage[key];
};
/**
 * 删除所有的本地存储(sessionStorage)
 */
export const deleteAllSessionStorage = () => {
  if (sessionStorage) {
    Object.keys(sessionStorage).map(item => {
      delete sessionStorage[item];
    });
  }
};
