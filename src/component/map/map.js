'use strict';
/**
 * Created by fanweihua on 2020/08/28.
 * 地图组件
 */
import { mapConfig } from '@/config/systemConfig'; // 系统内部配置文件
import React, { useEffect } from 'react';
import { MapUtils } from '@/common/tool/mapUtils'; // 地图接口工具
import './map.less';

/**
 * mapId，地图dom树的id标识，地图实例化的唯一标识
 * option，地图操作的基本配置，dimension为二三维切换，baseMap为地图底图类型切换
 * @param {*} props
 */
const Map = props => {
  const { mapId = 'map', className = '', loadFinished = () => {} } = props;
  /**
   * 入口
   */
  useEffect(() => {
    const mapIn = new MapUtils();
    const { mapView } = mapIn.initMap(mapId, {
      appKey: mapConfig.appKey,
      appUserId: mapConfig.appUserId,
      modelView: '3D',
      basemap: 'image',
      center: mapConfig.center,
      zoom: mapConfig.zoom
    }); // 地图初始化
    loadFinished(true);
  }, []);
  return (
    <section className="map_box">
      <div id={mapId} className={`map${className ? ` ${className}` : ''}`} />
    </section>
  );
};
export default Map;
