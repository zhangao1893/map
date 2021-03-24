/**
 * Created by FanWeiHua on 2019/4/14.
 * 工具类
 */
import QS from 'qs';
import moment from 'moment';

/**
 * 获取行政级别
 */
export const getSplitJgdm = dm => {
  if (!dm) {
    return '';
  }
  let [idx, temp] = [dm.length - 1, ''];
  for (let i = dm.length - 1; i >= 0; i = i - 2) {
    temp = dm.substring(i - 1, i + 1);
    if (temp !== '00') {
      break;
    }
    idx = i - 2;
  }
  let [returnValue, level] = [dm.substring(0, idx + 1), 0];
  if (returnValue.length === 2) {
    level = 1; // 省
  } else if (returnValue.length === 4) {
    level = 2; // 市
  } else if (returnValue.length === 6) {
    level = 3; // 区县
  } else if (returnValue.length === 8) {
    level = 4; // 派出所
  } else if (returnValue.length === 10) {
    level = 5; // 责任区
  }
  return { returnValue, level };
};
/**
 * 日期时间格式转换
 */
export const renderTime = date => {
  const dateee = new Date(date).toJSON();
  return new Date(+new Date(dateee) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '');
};
/**
 * 获取当前日期格式信息2018-01-01
 */
export const getCurrentDate = currentDate => {
  if (!currentDate) {
    return '';
  }
  if (typeof currentDate === 'string') {
    return currentDate;
  }
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return currentDate.getFullYear() + '-' + month + '-' + day;
};
/**
 * 时间格式转换
 * @param value //秒
 */
export const formatSeconds = value => {
  let theTime = parseInt(value, 0); // 秒
  if (isNaN(theTime)) {
    return false;
  }
  let theTime1 = 0; // 分
  let theTime2 = 0; // 小时
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60, 0);
    theTime = parseInt(theTime % 60, 0);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60, 0);
      theTime1 = parseInt(theTime1 % 60, 0);
    }
  }
  // let result = ""+parseInt(theTime,0)+"秒";
  let result = '';
  if (theTime1 > 0) {
    result = '' + parseInt(theTime1, 0) + '分' + result;
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2, 0) + '小时' + result;
  }
  return result;
};
export const getUid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};
/**
 * 获取元素到可视窗口的距离
 */
export const handleGetElmOffsetTop = elm => {
  if (!elm || elm.nodeType !== 1) {
    throw Error('参数必须为元素');
  }
  let offsetTop = elm.offsetTop;
  let parentNode = elm.offsetParent;
  while (parentNode !== null) {
    offsetTop += parentNode.offsetTop;
    parentNode = parentNode.offsetParent;
  }
  return offsetTop;
};
/**
 * 修改坐标串为一维数组(中国范围内)
 */
export const changeOneArray = (strings, separator = ',') => {
  const [arr, array] = [strings.split(separator), []];
  if (arr.length > 1) {
    for (let i = 0, lens = arr.length; i < lens; i++) {
      const [x, y] = [Number(arr[i]), Number(arr[i + 1])];
      if (y) {
        if (isNaN(x) || isNaN(y) || y <= 3.85 || y >= 53.55 || x <= 73.55 || x >= 135.083) {
          i = i + 1;
          continue;
        }
        array.push(x);
        array.push(y);
      }
      i = i + 1;
    }
  }
  return array;
};
/**
 * 修改坐标串为二维数组(中国范围内)
 */
export const changeTwoArray = (strings, separator = ',') => {
  const [arr, array] = [strings.split(separator), []];
  if (arr.length > 1) {
    for (let i = 0, lens = arr.length; i < lens; i++) {
      let [arrChild, x, y] = [[], Number(arr[i]), Number(arr[i + 1])];
      if (y) {
        if (isNaN(x) || isNaN(y) || y <= 3.85 || y >= 53.55 || x <= 73.55 || x >= 135.083) {
          i = i + 1;
          continue;
        }
        arrChild = [x, y];
      }
      if (arrChild.length) array.push(arrChild);
      i = i + 1;
    }
  }
  return array;
};
/**
 * 删除指定字符
 * @param string
 * @param re
 */
export const removeGivenString = (string, re) => {
  return string.split(re).join('');
};
/**
 * 拼接http的get请求获取url
 */
export const getSplitHttpUrl = obj => {
  let url = '?';
  Object.keys(obj).forEach((key, index) => {
    if (parseInt(index) === 0) {
      if (typeof obj[key] !== 'undefined') url += key + '=' + obj[key];
    } else {
      if (typeof obj[key] !== 'undefined') url += '&' + key + '=' + obj[key];
    }
  });
  return url;
};
/**
 * 数组坐标处理
 */
export const arrayCoordinatesHandle = list => {
  const array = [];
  if (list.length > 0) {
    for (let i = 0, lens = list.length; i < lens; i++) {
      const arr = [list[i][0], list[i][1]];
      array.push(arr);
    }
  }
  return array;
};
/**
 * 数组坐标处理
 */
export const arrayCoordinatesHandleToSting = list => {
  let arrayString = '';
  if (list.length > 0) {
    for (let i = 0, lens = list.length; i < lens; i++) {
      const arr = [list[i][0], list[i][1]];
      arrayString += i === 0 ? arr.toString() : ',' + arr.toString();
    }
  }
  return arrayString;
};

/**
 * 将数组切割成指定长度的子数组
 */
export const handleSliceArry = (array, size) => {
  const result = [];
  const len = array.length;
  const step = Math.ceil(len / size);
  if (!len) {
    return result;
  }
  for (let i = 0; i < step; i++) {
    const start = i * size;
    const end = (i + 1) * size;
    const tempArray = array.slice(start, end);
    result.push(tempArray);
  }
  return result;
};

/**
 * @description: 转换大成返回的路况轨迹坐标
 * @param {Array} data ===> 大成发挥的地图坐标数据
 * @return: Array 转换后的路径坐标
 */
export const handleTranslatePointForDC = data => {
  const result = [];
  for (let i = 0, len = data.length; i < len; i++) {
    for (let n = 0, plen = data[i].points.length; n < plen; n++) {
      result.push(data[i].points[n].point);
    }
  }
  return result;
};
/**
 * 下载base64图片
 * @param content 图片名称
 * @param fileName base64地址
 */
export const downloadBase64File = (content, fileName = '文件') => {
  const base64ToBlob = code => {
    const parts = code.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };
  const aLink = document.createElement('a');
  const blob = base64ToBlob(content); // new Blob([content]);
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('click', true, true); // initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window })); // 兼容火狐
};
/**
 * 路况查询框选范围坐标转化
 */
export const coordinatesHandleToTraffic = list => {
  if (list.length === 0) {
    return '';
  }
  // 取出二维坐标点
  const coordinates = list.map(item => item.slice(0, 2));
  const resultCoordinates = [];
  // 根绝对角线点算出另外两个点
  resultCoordinates[0] = coordinates[0];
  resultCoordinates[1] = [coordinates[1][0], coordinates[0][1]];
  resultCoordinates[2] = coordinates[1];
  resultCoordinates[3] = [coordinates[0][0], coordinates[1][1]];
  resultCoordinates[4] = coordinates[0];
  // 将坐标点转换为查询参数
  return resultCoordinates.map(item => item.join(' ')).toString();
};

/**
 * @description: 判断是否是图片路径
 * @param imgUrl {String} 图片URL地址
 * @return: Boolean
 */
export const handleGetImgPath = imgUrl => {
  if (!imgUrl) {
    return false;
  }
  // 常见图片的扩展名
  const imgSuffixs = ['.jpg', '.png', '.jpeg', '.gif', '.svg', '.bmp', '.jpe'];
  // 当前图片的扩展名
  const imgSuffix = imgUrl.substring(imgUrl.lastIndexOf('.'));
  return imgSuffixs.indexOf(imgSuffix.toLowerCase()) !== -1;
};
/**
 * 生成图层uuid，保证每个图层有唯一一个uuid
 */
export const getUuid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};
/**
 * 数字不满两位前面加0
 */
export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
/**
 * 获取当前时间
 */
export const handleGetNow = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hour)}:${formatNumber(
    minute
  )}:${formatNumber(second)}`;
};
/**
 * 四舍五入保留有效数字
 */
export const formatting = (src, pos) => {
  return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
};

/**
 * 在多个地址中随机获取一个地址，一旦获得地址后，后续所以访问都用此地址
 * @param urls(array)   地址数组
 */
export const getHashUrl = urls => {
  if (urls.length < 1) {
    return '' + urls;
  }
  const u = sessionStorage.getItem('ws_url');
  if (u && u !== '') {
    return u;
  } else {
    const rand = Math.floor(Math.random() * urls.length);
    const data = urls.slice(rand, 1)[0];
    sessionStorage.setItem('ws_url', data);
    return data;
  }
};

/**
 * 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。
 * @param fn  函数
 * @param ms  时间段内
 * @returns {Function}
 */
export const throttle = (fn, ms) => {
  let canRun = true; // 通过闭包保存一个标记
  return function () {
    if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
    canRun = false; // 立即设置为false
    setTimeout(() => {
      // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments);
      /* 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      当定时器没有执行的时候标记永远是false，在开头被return掉 */
      canRun = true;
    }, ms);
  };
};

/**
 * 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间。
 * @param fn
 * @param ms
 * @returns {Function}
 */
export const debounce = (fn, ms) => {
  let timeout = null; // 创建一个标记用来存放定时器的返回值
  return function () {
    clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
    // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, ms);
  };
};
/**
 * 图形定位(主要针对多个点或单个点定位，注：必须要是包含[item.x,item.y]属性的数组类型)
 */
export const graphicPositioning = (data, MapUtils) => {
  // 无数据
  if (!data) return;
  // 传入的数据非数组
  const list = data instanceof Array ? data : [data];
  // 只有一个点
  if (list.length === 1) {
    const [{ x, y }] = list;
    // 定位
    MapUtils.setMapLocation({ center: [x, y] });
    return;
  }
  // 定位面
  const coordinates = list.map(item => [+item.x, +item.y]).filter(item => item.every(cItem => !isNaN(cItem)));
  const geoJson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coordinates
    }
  };
  MapUtils.locateByGraphic(geoJson);
};
/**
 * 图形定位(主要针对多个点或单个点定位，注：必须要是包含[x,y]属性的数组类型)
 */
export const grapPosBycoords = (list, MapUtils) => {
  if (list.length) {
    let geoJson = '';
    // 线定位
    if (list.length > 1) {
      const coordinates = [...list];
      geoJson = { type: 'Feature', geometry: { type: 'LineString', coordinates: coordinates }, properties: {} };
      MapUtils.locateByGraphic(geoJson);
    } else {
      // 点定位
      MapUtils.setMapLocation({ center: list }); // 定位
    }
  }
};
/**
 * 根据路由path获取路由对象
 * @param path
 * @param list
 */
export const getRouteByPath = (path, list) => {
  let [route, state] = ['', false];
  for (let i = 0, lens = list.length; i < lens; i++) {
    if (path === list[i].path) {
      route = list[i];
      state = true;
      break;
    } else {
      if (list[i].routes && list[i].routes.length > 0) {
        const objDate = getRouteByPath(path, list[i].routes);
        if (objDate.state) {
          route = objDate.route;
          state = true;
          break;
        }
      }
    }
  }
  return { route, state };
};
/**
 * 路径分割成有效数组对象排序
 */
export const arraySegmentationByRouter = list => {
  const [obj, listRoute] = [{}, []];
  for (let i = 0, lens = list.length; i < lens; i++) {
    if (obj[list[i].order] instanceof Array) {
      obj[list[i].order].push(list[i]);
    } else {
      obj[list[i].order] = [];
      obj[list[i].order].push(list[i]);
    }
  }
  const listObj = Object.keys(obj);
  if (listObj.length > 0) {
    Object.keys(obj).map(key => {
      listRoute.push(obj[key]);
    });
  }
  return listRoute;
};
/**
 * 数组根据有效规则分割成对象
 */
export const arraySegmentation = (list, num) => {
  const [obj, sliceN] = [
    {},
    list.length / num <= 1 && list.length / num > 0
      ? 0
      : parseInt(list.length % num > 0 ? list.length / num + 1 : list.length / num)
  ];
  if (sliceN === 0) {
    obj[0] = list;
  } else {
    for (let i = 0; i < sliceN; i++) {
      if (i === 0) {
        obj[i] = list.slice(0, num);
      } else {
        obj[i] = list.slice(num * i, num * (i + 1));
      }
    }
  }
  return obj;
};
/**
 * 处理边界坐标（多个飞地问题）
 */
export const handleMoreStrToArray = geoStr => {
  let borderArray = [];
  geoStr = geoStr.replace(/;/g, '|');
  if (geoStr.indexOf('|') >= 0) {
    borderArray = geoStr.split('|');
  } else {
    borderArray.push(geoStr);
  }
  return borderArray;
};
/**
 * 处理边界坐标（多个飞地问题）取单一坐标点
 */
export const handleSingleMoreStrToArray = geoStr => {
  let bounds = '';
  geoStr = geoStr.replace(/;/g, '|');
  if (geoStr.indexOf('|') >= 0) {
    bounds = geoStr.split('|')[0];
  } else {
    bounds = geoStr;
  }
  return bounds;
};
/**
 * 获取抽稀距离倍数
 */
export const getSimParams = level => {
  level = parseInt(level);
  const simParams = {
    1: { kind: '00,01', sim: 75000 },
    2: { kind: '00,01', sim: 65000 },
    3: { kind: '00,01', sim: 55000 },
    4: { kind: '00,01', sim: 45000 },
    5: { kind: '00,01', sim: 35000 },
    6: { kind: '00,01', sim: 20000 },
    7: { kind: '00,01', sim: 20000 },
    8: { kind: '00,01', sim: 15000 },
    9: { kind: '00,01', sim: 5000 },
    10: { kind: '00,01', sim: 2000 },
    11: { kind: '00,01,02,03,04', sim: 1500 },
    12: { kind: '00,01,02,03,04', sim: 0 },
    13: { kind: '00,01,02,03,04', sim: 0 },
    14: { kind: '00,01,02,03,04,06', sim: 0 },
    15: { kind: '00,01,02,03,04,06', sim: 0 },
    16: { kind: '00,01,02,03,04,06', sim: 0 },
    17: { kind: '00,01,02,03,04,06', sim: 0 },
    18: { kind: '00,01,02,03,04,06', sim: 0 },
    19: { kind: '00,01,02,03,04,06', sim: 0 },
    20: { kind: '00,01,02,03,04,06', sim: 0 }
  };
  if (!simParams[level]) {
    return { kind: '00,01,02,03,04,06', sim: 0 };
  } else {
    return simParams[level];
  }
};
/**
 * 转换公共字段
 */
export const translatePublicFiled = (data, filed) => {
  switch (filed) {
    case 'X':
      return data[filed] || (data.customs && data.customs[filed]) || data.x || (data.customs && data.customs.x);
    case 'Y':
      return data[filed] || (data.customs && data.customs[filed]) || data.y || (data.customs && data.customs.y);
    case 'JD':
      return data[filed] || (data.customs && data.customs[filed]) || data.x || (data.customs && data.customs.x);
    case 'WD':
      return data[filed] || (data.customs && data.customs[filed]) || data.y || (data.customs && data.customs.y);
    case 'MC':
      return data[filed] || (data.customs && data.customs[filed]) || data.name || (data.customs && data.customs.name);
    case 'DZ':
      return (
        data[filed] || (data.customs && data.customs[filed]) || data.address || (data.customs && data.customs.address)
      );
    case 'GXDW':
      return (
        data[filed] || (data.customs && data.customs[filed]) || data.orgname || (data.customs && data.customs.orgname)
      );
    case 'GXDWDM':
      return (
        data[filed] || (data.customs && data.customs[filed]) || data.orgcode || (data.customs && data.customs.orgcode)
      );
    default:
      return data[filed] || (data.customs && data.customs[filed]) || '';
  }
};

/**
 * 获取URL地址参数
 */
export const getUrlParam = (url = '') => {
  if (!url) return {};
  // 将URL地址?分隔
  const paramString = url.indexOf('?') === -1 ? url : url.split('?')[1];
  return QS.parse(paramString);
};

/**
 * 设置URL地址参数
 */
export const setUrlParam = (url, params) => {
  return url.indexOf('?') !== -1
    ? // URL地址自带参数
      `${url}&${QS.stringify(params)}`
    : // URL地址无参数
      `${url}?${QS.stringify(params)}`;
};

/**
 * 转换多维坐标
 */
export const translateCoordinate = data => {
  // 无数据
  if (!data) return [];
  // 判断是否已经是坐标数据
  if (data.length && !Array.isArray(data[0])) return data;
  // 多维数组坐标转为正常的二维数组坐标
  return data.reduce((total, item) => {
    return item.length && Array.isArray(item[0]) ? total.concat(translateCoordinate(item)) : [...total, item];
  }, []);
};

/**
 * 计算一周的开始
 */
export const handleGetWeekStart = (date = '') => {
  // 计算当天是周几
  const weekOfDay = Number(moment(date).format('E'));
  // 周一的日期
  return moment(date)
    .subtract(weekOfDay - 1, 'days')
    .format('YYYY-MM-DD');
};
/**
 * 计算一周的结束为周天
 */
export const handleGetWeekEnd = (date = '') => {
  // 计算当天是周几
  const weekOfDay = Number(moment(date).format('E'));
  // 周天的日期
  return moment(date)
    .add(7 - weekOfDay, 'days')
    .format('YYYY-MM-DD');
};
/**
 * 根据key获取对应对象
 */
export const getObjByKey = (key, list) => {
  let [obj, state] = ['', false];
  for (let i = 0, lens = list.length; i < lens; i++) {
    if (key === list[i].key) {
      obj = list[i];
      state = true;
      break;
    } else {
      if (list[i].children && list[i].children.length > 0) {
        const objDate = getObjByKey(key, list[i].children);
        if (objDate.state) {
          obj = objDate.obj;
          state = true;
          break;
        }
      }
    }
  }
  return { obj, state };
};
/**
 * 数组对象深拷贝
 * @param arr
 */
export const copyArray = arr => {
  return arr.map(e => {
    if (typeof e === 'object') {
      return Object.assign({}, e);
    } else {
      return e;
    }
  });
};
/**
 * 根据路由地址获取对应对象
 */
export const getObjByPath = (path, list) => {
  let [obj, state] = ['', false];
  for (let i = 0, lens = list.length; i < lens; i++) {
    if (path === list[i].path) {
      obj = list[i];
      state = true;
      break;
    } else {
      if (list[i].children && list[i].children.length > 0) {
        const objDate = getObjByPath(path, list[i].children);
        if (objDate.state) {
          obj = objDate.obj;
          state = true;
          break;
        }
      }
    }
  }
  return { obj, state };
};
