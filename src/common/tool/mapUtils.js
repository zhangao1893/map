'use strict';
/**
 * Created by fanweihua on 2020/08/27.
 * 地图接口工具
 */
import { mapConfig } from '@/config/systemConfig'; // 系统内部配置文件
import { getLocalStorage, setLocalStorage } from './localDataStorage'; // 本地存储
import _ from 'lodash';
/**
 * 根据不同的地图id获取对应的地图实例
 */
const mapInitView = {}; // 地图实例集合
export const getMapViewByMapId = id => {
  if (!id) return console.error('地图id必传');
  if (!mapInitView[id]) {
    console.error('不存在地图实例，请确认地图id正确性');
    return;
  }
  return mapInitView[id];
};
/**
 * 获取数据服务
 */
export const getDataServer = () => {
  const options = {
    appKey: mapConfig.appKey,
    appUserId: mapConfig.appUserId
  };
  return new window.FDataService(options);
};

class MapUtils {
  constructor() {
    this.mapId = undefined; // 地图id
    this.mapView = undefined; // 地图对象
    this.view = undefined;
    this.timeOutReset = undefined; // 重新上图的timeOut
    this.drawTemporarilyData = {}; // 临时地图标绘数据存储
    this.measureData = {}; // 临时测量数据存储
    this.infoWindowData = {}; // 临时气泡框数据
    this.markersSnap = {}; // 临时markers数据
    this.hotSpotSnap = {}; // 临时热点图数据
    this.mapEvent = {}; // 临时地图事件存储
    this.graphicEvent = {}; // 临时要素事件
    this.mapOptions = {
      center: [104.07, 30.67], // 默认成都经纬度
      zoom: 16,
      modelView: '2D',
      navigation: false,
      basemap: 'image',
      scalebar: true // 是否显示比例尺控件
    };
  }

  /**
   * 地图实例化
   */
  initMap(id, options = {}) {
    if (!id || typeof id !== 'string') {
      return console.error('请传递正确的地图id');
    }
    this.mapId = id;
    const mapOptions = getLocalStorage(`${id}_mapOptions`) || {};
    this.mapOptions = { ...this.mapOptions, ...mapOptions };
    // 实例化地图对象存储
    // 目的是为了区分，如果存在多个地图实例，可以很好的区分不同
    // 获取不同地图实例方式为：getMapViewByMapId(id)
    mapInitView[id] = this;
    this.mapOptions = { ...this.mapOptions, ...options };
    return this.mapOptions.modelView === '2D'
      ? this.initOpenLayers(id, this.mapOptions)
      : this.initCesium(id, this.mapOptions); // 初始化地图
  }

  /**
   * 初始化OpenLayers
   */
  initOpenLayers(id, options = {}) {
    try {
      if (this.mapView) this.mapView.removeAllGraphic(); // 清除所有地图要素
      if (document.getElementById(this.mapId)) document.getElementById(this.mapId).innerHTML = '';
      this.mapView = new window.OpenLayersFMap(); // OpenLayers地图对象
      this.view = this.mapView.initMap(id, options); // 地图初始化
      setLocalStorage(`${id}_mapOptions`, options);
      return { mapView: this.mapView, view: this.view };
    } catch {
      console.error('初始化OpenLayers失败');
    }
  }

  /**
   * 初始化Cesium
   */
  initCesium(id, options = {}) {
    try {
      if (this.mapView) this.mapView.removeAllGraphic(); // 清除所有地图要素
      if (document.getElementById(this.mapId)) document.getElementById(this.mapId).innerHTML = '';
      this.mapView = new window.CesiumFMap();
      this.view = this.mapView.initMap(id, options); // 地图初始化
      setLocalStorage(`${id}_mapOptions`, options);
      return { mapView: this.mapView, view: this.view };
    } catch {
      console.error('初始化Cesium失败');
    }
  }

  /**
   * 地图维度切换
   */
  mapDimension(type = '2D', callBack) {
    if (this.mapView) {
      const option = this.getMapLocation(); // 获取地图位置
      this.mapOptions = { ...this.mapOptions, ...option };
      this.mapOptions.modelView = type;
      this.initMap(this.mapId, this.mapOptions); // 地图实例化
      /**
       * 这样写的原因是：可能是SDK那边有问题
       * 在3D切换到2D的时候，延迟重新上图才会没有问题
       */
      if (this.timeOutReset) clearTimeout(this.timeOutReset);
      this.timeOutReset = setTimeout(() => {
        this.resetGraphic(); // 重新上图（针对二三维切换重新上图功能）
        if (callBack) {
          if (!_.isFunction(callBack)) {
            return console.error('请传递正确的function');
          }
          callBack(this.mapView, this.view);
        }
      }, 1000);
    }
  }

  /**
   * 重新上图（针对二三维切换重新上图功能）
   */
  resetGraphic() {
    // 创建标绘对象
    Object.keys(this.drawTemporarilyData).map(item => {
      this.createGraphic(item, this.drawTemporarilyData[item]);
    });
    // 创建markers点
    Object.keys(this.markersSnap).map(item => {
      this.showMarker(this.markersSnap[item].renderData, this.markersSnap[item].options);
    });
    // 创建热点图
    Object.keys(this.hotSpotSnap).map(item => {
      this.queryHotSpot(this.hotSpotSnap[item]);
    });
    // 创建测量要素
    Object.keys(this.measureData).map(item => {
      this.createGraphicMeasure(this.measureData[item]);
    });
    // 地图事件
    Object.keys(this.mapEvent).map(item => {
      this.registerMapEvent(this.mapEvent[item].type, this.mapEvent[item].callBack, item);
    });
    // 要素事件
    Object.keys(this.graphicEvent).map(item => {
      this.registerGraphicEvent(this.graphicEvent[item].type, this.graphicEvent[item].callBack, item);
    });
  }

  /**
   * 获取地图配图方案
   */
  getBaseMap() {
    return this.mapView.getBasemap();
  }

  /**
   * 地图底图切换
   */
  baseMapChange(name = 'vector') {
    this.mapOptions.basemap = name;
    setLocalStorage(`${this.mapId}_mapOptions`, this.mapOptions);
    this.mapView.changeBasemap(name);
  }

  /**
   * 获取地图位置
   */
  getMapLocation() {
    return this.mapView.getMapLocation();
  }

  /**
   * 设置当前地图配置信息
   */
  setCurMapOptions(mapOption) {
    this.mapOptions = { ...this.mapOptions, ...mapOption };
    return this.mapOptions;
  }

  /**
   * 获取当前地图配置信息
   */
  getCurMapOptions() {
    return this.mapOptions;
  }

  /**
   * 创建标绘对象
   */
  createGraphic(uuid = '', geoJson, events = {}) {
    if (!geoJson || Object.prototype.toString.call(geoJson) !== '[object Object]') {
      console.error('请传递正确的geoJson数据');
      return;
    }
    const cloneEvents = {
      ...events,
      finish: result => {
        typeof events.finish === 'function' && events.finish(result);
        this.drawTemporarilyData[result.properties.uuid] = result;
      }
    };
    this.mapView.createGraphic(uuid, geoJson, cloneEvents);
  }

  /**
   * 清除指定要素
   */
  removeGraphic(uuid) {
    if (uuid && uuid instanceof Array && uuid.length) {
      uuid.map(item => {
        delete this.drawTemporarilyData[item];
        delete this.infoWindowData[item];
        delete this.markersSnap[item];
        delete this.hotSpotSnap[item];
        delete this.measureData[item];
      });
      this.mapView.removeGraphic(uuid);
      return;
    }
    if (uuid && typeof uuid === 'string') {
      this.mapView.removeGraphic([uuid]);
      delete this.drawTemporarilyData[uuid];
      delete this.infoWindowData[uuid];
      delete this.markersSnap[uuid];
      delete this.hotSpotSnap[uuid];
      delete this.measureData[uuid];
    }
  }

  /**
   * 删除自定义地图
   */
  removeDefinedMap(uuid) {
    this.mapView.removeDefinedMap(uuid);
  }

  /**
   * 清除所有地图要素
   */
  removeAllGraphic() {
    this.mapView.removeAllGraphic(); // 清除所有地图要素
    this.drawTemporarilyData = {}; // 清除临时地图绘制数据存储
    this.infoWindowData = {};
    this.markersSnap = {};
    this.hotSpotSnap = {};
    this.measureData = {};
  }

  /**
   * 修改要素样式
   * @param uid  要素uuid
   * @param style 样式对象
   */
  modifyGraphicStyle(uid, style) {
    this.mapView.modifyGraphicStyle(uid, style);
  }

  /**
   * 创建标绘
   */
  drawGraphic(type, options = {}, events = {}) {
    this.cancelDrawGraphic(); // 取消标绘状态
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return console.error('请传递正确的options参数');
    }
    // 设置鼠标样式
    document.body.style.cursor = 'crosshair'; // 设置鼠标样式
    const cloneEvents = {
      ...events,
      finish: result => {
        if (result.geometry.type !== 'Point' && result.geometry.type !== 'LineString') {
          result.geometry.coordinates[0] = result.geometry.coordinates[0].map(item => item?.splice(0, 2));
        }
        typeof events.finish === 'function' && events.finish(result);
        document.body.style.cursor = ''; // 绘制结束后还原鼠标样式
        this.drawTemporarilyData[result.properties.uuid] = result;
      }
    };
    this.mapView.drawGraphic(type, options, cloneEvents);
  }

  /**
   * 取消标绘状态
   */
  cancelDrawGraphic() {
    this.mapView.cancelDrawGraphic();
  }

  /**
   * 弹出气泡框
   */
  openInfoWindow(options = {}, callBack) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return console.error('请传递正确的参数');
    }
    if (!options.coordinate) {
      return console.error('定位坐标必传');
    }
    if (!options.popupContent) {
      options.popupContent = '<span>暂无信息</span>';
    }
    options = { closeOthers: true, showBottom: true, ...options };
    const uuid = this.mapView.openInfoWindow(options, custom => {
      const { uuid } = custom;
      delete this.infoWindowData[uuid];
      if (callBack) {
        if (!_.isFunction(callBack)) {
          return console.error('请传递正确的function');
        }
        callBack(custom);
      }
    });
    // 判断是否为自定义关闭
    if (options.customCloseId) {
      if (!document.getElementById(options.customCloseId)) {
        return console.error('请传递正确的自定义关闭id');
      }
      document.getElementById(options.customCloseId).onclick = () => {
        delete this.infoWindowData[uuid];
        this.removeGraphic(uuid);
        if (callBack) {
          if (!_.isFunction(callBack)) {
            return console.error('请传递正确的function');
          }
          callBack(uuid);
        }
      };
    }
    options.uuid = uuid;
    this.infoWindowData[uuid] = options;
    return uuid;
  }

  /**
   * 展示marker点
   */
  showMarker(
    renderData = [],
    options = {
      cluster: false, // 是否聚合
      showTitle: false // 是否展示标题
    }
  ) {
    if (!_.isArray(renderData)) {
      return console.error('请传递正确的参数');
    }
    if (!_.isObject(options)) {
      return console.error('请传递正确的参数');
    }
    options.zIndex = 999;
    const { uuid } = this.mapView.showMarker(renderData, options);
    options.uuid = uuid;
    this.markersSnap[uuid] = { renderData, options };
    return uuid;
  }

  /**
   * 查询热点图
   */
  queryHotSpot(options = {}) {
    // if (!options.layers || typeof options.layers !== 'string') {
    //   return console.error('请传递正确的热点图参数');
    // }
    options = { zIndex: 998, scale: 1, ...options };
    const { uuid } = this.mapView.queryHotSpot(options);
    this.hotSpotSnap[uuid] = options;
    return uuid;
  }

  /**
   * 资源查询
   */
  queryResource(queryOptions = {}, spaceOption = {}) {
    if (!queryOptions.layer) {
      return console.error('请传递正确图层参数');
    }
    return new Promise(resolve => {
      try {
        this.mapView.queryResource(queryOptions, spaceOption, result => {
          if (_.isEmpty(result)) {
            result = { total: 0, rows: [] };
          }
          if (!result.rows || !_.isArray(result.rows)) {
            result.rows = [];
          }
          resolve(result);
        });
      } catch {
        console.error('资源查询错误');
        resolve({ total: 0, rows: [] });
      }
    });
  }

  /**
   * 地址匹配
   */
  geocode(address, callBack) {
    this.mapView.geocode(address, result => {
      if (callBack) {
        if (!_.isFunction(callBack)) {
          return console.error('请传递正确的function');
        }
        callBack(result);
      }
    });
  }

  /**
   * 获取可视域包络框
   */
  getViewPort() {
    return this.mapView.getViewPort();
  }

  /**
   * 设置地图位置
   */
  setMapLocation(options = {}) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return console.error('请传递正确的参数');
    }
    options = { duration: 500, ...options };
    this.mapView.setMapLocation(options);
  }

  /**
   * 根据图形定位（坐标字符）
   */
  locateByGraphic(coordinates = [], type = 'Polygon') {
    if (!_.isArray(coordinates)) {
      return console.error('请传递正确的coordinates参数');
    }
    const geoJson = {
      type: 'Feature',
      geometry: {
        type: type,
        coordinates: [...coordinates]
      },
      properties: {}
    };
    this.mapView.locateByGraphic(geoJson);
  }

  /**
   * 根据图形定位（geoJson）
   */
  locateByGraphicGeoJson(geoJson) {
    this.mapView.locateByGraphic(geoJson);
  }

  /**
   * 图层字段查询
   */
  getLayerFields(layerId) {
    if (!_.isString(layerId) || !layerId) {
      console.error('请传入正确的layerId');
      return;
    }
    return new Promise(resolve => {
      try {
        this.mapView.getLayerFields(layerId, result => {
          if (_.isEmpty(result)) {
            result = { total: 0, rows: [] };
          }
          if (!result.rows || !_.isArray(result.rows)) {
            result.rows = [];
          }
          resolve(result);
        });
      } catch {
        console.error('资源查询错误');
        resolve({ total: 0, rows: [] });
      }
    });
  }

  /**
   * 路径规划
   */
  getRouting(options = {}) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return console.error('请传递正确的参数');
    }
    if (!options.searchType) {
      return console.error('路径规划类型必传');
    }
    if (!options.orig) {
      return console.error('起点参数错误');
    }
    if (!options.dest) {
      return console.error('终点参数错误');
    }
    options = {
      strategy: 0,
      ...options
    };
    return new Promise(resolve => {
      try {
        this.mapView.getRouting(options, result => {
          if (_.isEmpty(result)) {
            result = { total: 0, rows: [] };
          }
          if (!result.rows || !_.isArray(result.rows)) {
            result.rows = [];
          }
          resolve(result);
        });
      } catch {
        console.error('资源查询错误');
        resolve({ total: 0, rows: [] });
      }
    });
  }

  /**
   * 地图事件
   */
  registerMapEvent(type = 'leftClick', callBack, uuid = undefined) {
    if (!type || typeof type !== 'string') {
      return console.error('请传递正确的类型');
    }
    const option = { uuid };
    const item = this.mapView.registerMapEvent(
      type,
      result => {
        if (callBack) {
          if (!_.isFunction(callBack)) {
            return console.error('请传递正确的function');
          }
          callBack(result);
        }
      },
      option
    );
    this.mapEvent[item.uuid] = { type, callBack };
    return item;
  }

  /**
   * 取消地图事件
   */
  unregisterMapEvent(uuid) {
    if (!uuid || typeof uuid !== 'string') {
      return console.error('请传递正确的地图事件uuid');
    }
    this.mapView.unregisterMapEvent(uuid);
  }

  /**
   * 注册要素事件
   */
  registerGraphicEvent(type = 'leftClick', callBack, uuid) {
    if (!type || typeof type !== 'string') {
      return console.error('请传递正确的类型');
    }
    const option = { uuid };
    const item = this.mapView.registerGraphicEvent(
      type,
      result => {
        if (callBack) {
          if (!_.isFunction(callBack)) {
            return console.error('请传递正确的function');
          }
          callBack(result);
        }
      },
      option
    );
    this.graphicEvent[item.uuid] = { type, callBack };
    return item.uuid;
  }

  /**
   * 取消要素事件
   */
  unregisterGraphicEvent(uuid) {
    if (!uuid || typeof uuid !== 'string') {
      return console.error('请传递正确的类型');
    }
    this.mapView.unregisterGraphicEvent(uuid);
  }

  /**
   * 逆地址编码
   */
  reverseGeocode(location, options = {}) {
    options = {
      // 周边范围(米)或园半径
      buffer: 100,
      // 是否扩展查询范围，取值0或1默认为0
      isExtendBuffer: 0,
      // 页大小默认为30
      pageSize: 1,
      ...options
    };
    return new Promise(resolve => {
      try {
        this.mapView.reverseGeocode(location, options, result => {
          if (_.isEmpty(result)) {
            result = { total: 0, rows: [] };
          }
          if (!result.rows || !_.isArray(result.rows)) {
            result.rows = [];
          }
          resolve(result);
        });
      } catch {
        console.error('资源查询错误');
        resolve({ total: 0, rows: [] });
      }
    });
  }

  /**
   * 获取下级机构
   */
  getSubsidiaries(options) {
    return new Promise(resolve => {
      try {
        this.mapView.getSubsidiaries(options, result => {
          if (_.isEmpty(result)) {
            result = { total: 0, rows: [] };
          }
          if (!result.rows || !_.isArray(result.rows)) {
            result.rows = [];
          }
          resolve(result);
        });
      } catch {
        console.error('下级机构查询失败');
        resolve({ total: 0, rows: [] });
      }
    });
  }

  /**
   * 获取机构辖区边界
   */
  getAreaCoord(orgCode) {
    if (!orgCode || typeof orgCode !== 'string') {
      return console.error('请传递正确的组织机构代码');
    }
    return new Promise(resolve => {
      try {
        this.mapView.getAreaCoord(orgCode, result => {
          if (_.isEmpty(result)) {
            result = { total: 0, rows: [] };
          }
          if (!result.rows || !_.isArray(result.rows)) {
            result.rows = [];
          }
          resolve(result);
        });
      } catch {
        console.error('获取机构查询失败');
        resolve({ total: 0, rows: [] });
      }
    });
  }

  /**
   * 地图进入测量模式
   */
  activateMeasure(type, closeable = false, callBack) {
    this.cancelMeasure(); // 退出测量模式
    if (!type) {
      return console.error('请传正确的类型');
    }
    const typeList = ['height', 'distance', 'area'];
    if (typeList.indexOf(type) === -1) {
      return console.error('请传正确的类型');
    }
    this.mapView.activateMeasure(
      type,
      closeable,
      result => {
        if (callBack) {
          if (!_.isFunction(callBack)) {
            return console.error('请传递正确的function');
          }
          callBack(result);
        }
        this.cancelMeasure(); // 退出测量模式
        this.measureData[result.properties.uuid] = result;
      },
      ({ uuid }) => {
        delete this.measureData[uuid];
      }
    );
  }

  /**
   * 创建测量要素
   */
  createGraphicMeasure(geoJson, options = {}) {
    if (!geoJson || Object.prototype.toString.call(geoJson) !== '[object Object]') {
      console.error('请传递正确的geoJson数据');
      return;
    }
    const option = {
      del: true, // 是否显示测量删除按钮，默认不显示
      ...options
    };
    return this.mapView.createGraphicMeasure(geoJson, option, ({ uuid }) => {
      delete this.measureData[uuid];
    });
  }

  /**
   * 退出测量模式
   */
  cancelMeasure() {
    this.mapView.cancelMeasure();
  }

  /**
   * 通视分析
   */
  lineOfSightAnalysis(options = {}) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return console.error('请传递正确的参数');
    }
    options = {
      closeable: true,
      ...options
    };
    const { uuid } = this.mapView.lineOfSightAnalysis(options);
    return uuid;
  }

  /**
   * 可视分析
   */
  viewShedAnalysis(options = {}, callBack) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return console.error('请传递正确的参数');
    }
    options = {
      closeable: true,
      callback: result => {
        if (callBack) {
          if (!_.isFunction(callBack)) {
            return console.error('请传递正确的function');
          }
          callBack(result);
        }
      },
      ...options
    };
    const { uuid } = this.mapView.viewShedAnalysis(options);
    return uuid;
  }

  /**
   * 获取用户的专题图层
   */
  getThemeLayers(callBack) {
    this.mapView.getThemeLayers(result => {
      if (!_.isFunction(callBack)) {
        return console.error('请传递正确的回调function');
      }
      callBack(result);
    });
  }

  /**
   * 获取图层扩展功能
   */
  getLayerExtend(layerName, callBack) {
    this.mapView.getLayerExtend(layerName, result => {
      if (!_.isFunction(callBack)) {
        return console.error('请传递正确的回调function');
      }
      if (result?.length) {
        callBack(result);
      } else {
        callBack([]);
      }
    });
  }

  // 设置对象可编辑
  setGraphicEditable(arr, bool) {
    this.mapView.setGraphicEditable(arr, bool);
  }

  /**
   * 屏幕坐标转地图坐标
   * @param  pixel
   * @returns {*}
   */
  getLonLatByPixel(pixel) {
    return this.mapView.getLonLatByPixel(pixel);
  }

  /**
   * 根据雨量图层名，上雨量图层
   */
  addSCGGQXMapLayer(layerName, zIndex = 2) {
    if (this.mapView.addSCGGQXMapLayer) {
      return this.mapView.addSCGGQXMapLayer(layerName, zIndex);
    } else {
      return { uuid: '' };
    }
  }

  /**
   * 防汛大屏 图层叠加
   */
  showFloodScreenLayer(queryOptions, spaceOption, bOption) {
    if (this.mapView.showFloodScreenLayer) {
      return this.mapView.showFloodScreenLayer(queryOptions, spaceOption, bOption);
    } else {
      return { uuid: '' };
    }
  }

  /**
   * 彩云降雨量接口
   */
  addCaiyunRadarImage(options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      return console.error('请传递正确的参数');
    }
    return this.mapView.addCaiyunRadarImage(options);
  }

  /**
   * 多个geoJson上图
   */
  createGraphicByGeoJSON(uuid, json, style, zIndex) {
    return this.mapView.createGraphicByGeoJSON(uuid, json, style, zIndex);
  }

  /**
   * 计算缓冲区
   */
  getGeometryBuffer(geoJson, buffer) {
    return this.mapView.getGeometryBuffer(geoJson, buffer);
  }

  /**
   * 导出图片
   */
  exportPng(callBack) {
    return this.mapView.exportPng(data => {
      callBack(data);
    });
  }

  /**
   * 计算重心点
   */
  getBarycentre(geoJson) {
    if (!geoJson || Object.prototype.toString.call(geoJson) !== '[object Object]') {
      console.error('请传递正确的geoJson数据');
      return;
    }
    if (geoJson?.geometry?.type === 'Polygon') {
      return this.mapView.getBarycentre(geoJson);
    } else {
      console.error('只能计算面类型的数据');
    }
  }

  /**
   * 计算重心点
   */
  addFloodBillboard(data) {
    return this.mapView.addFloodBillboard(data);
  }

  /**
   * 获取视觉中心点（支持线、面）
   */
  getVisionCenter(geoJson) {
    if (!geoJson || Object.prototype.toString.call(geoJson) !== '[object Object]') {
      console.error('请传递正确的geoJson数据');
      return;
    }
    return this.mapView.getVisionCenter(geoJson);
  }

  /**
   * 森火一张图上图
   * */

  addDefinedMap(data) {
    return this.mapView.addDefinedMap(data);
  }
}

export { MapUtils };
